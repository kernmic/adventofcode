import Control.Monad
import Data.Char
import Data.List
import Data.List.Split
import Data.List.Extra     (nubOrd, merge)
import Data.Map (fromListWith, toList)
import Data.Set (fromList)
import Debug.Trace
import Data.Ord

data Guard = Guard {
  gid :: Int
} deriving (Show)

data Time = Time {
  year :: Int,
  month :: Int,
  day :: Int,
  hour :: Int,
  minute :: Int,
  checksum :: Int
} deriving (Show)

data Event = Start Time Guard | Sleep Time | Wakeup Time deriving (Show)

getGuard :: Event -> Guard
getGuard (Start _ x) = x

getTime :: Event -> Time
getTime (Start t _) = t
getTime (Sleep t) = t
getTime (Wakeup t) = t

isStartEvent :: Event -> Bool
isStartEvent (Start _ _) = True
isStartEvent _ = False

isSleepEvent :: Event -> Bool
isSleepEvent (Sleep _) = True
isSleepEvent _ = False

isWakeupEvent :: Event -> Bool
isWakeupEvent (Wakeup _) = True
isWakeupEvent _ = False

instance Eq Guard where
    (Guard x) == (Guard y) = x == y

instance Ord Guard where
    compare (Guard x) (Guard y) = compare x y

instance Eq Time where
    (Time _ _ _ _ _ x) == (Time _ _ _ _ _ y) = x == y

instance Ord Time where
    compare (Time _ _ _ _ _ x) (Time _ _ _ _ _ y) = compare x y

instance Eq Event where
    (Start x _) == (Start y _) = x == y
    (Sleep x) == (Sleep y) = x == y
    (Wakeup x) == (Wakeup y) = x == y

instance Ord Event where
    compare (Start x _) (Start y _) = compare x y
    compare (Sleep x) (Sleep y) = compare x y
    compare (Wakeup x) (Wakeup y) = compare x y
    compare (Sleep x) (Wakeup y) = compare x y
    compare (Wakeup x) (Sleep y) = compare x y
    compare (Start x _) (Sleep y) = compare x y
    compare (Sleep x) (Start y _) = compare x y
    compare (Start x _) (Wakeup y) = compare x y
    compare (Wakeup x) (Start y _) = compare x y


convertToEvent :: String -> Event
convertToEvent x
  | isSleep = Sleep time
  | isWakeup = Wakeup time
  | otherwise = Start time (Guard (nmbrs !! 5))
  where
    time = (Time (nmbrs !! 0) (nmbrs !! 1) (nmbrs !! 2) (nmbrs !! 3) (nmbrs !! 4) chksm)
    chksm = read $ concat [(raw !! 0), (raw !! 1), (raw !! 2), (raw !! 3), (raw !! 4)]
    nmbrs = map ( (*1) . read) $ raw
    raw = filter (any isDigit) $ filter ((>0) . length) $ splitOneOf "[- :]#" x
    isSleep = "falls asleep" `isInfixOf` x
    isWakeup = "wakes up" `isInfixOf` x

frequency :: (Ord a) => [a] -> [(a, Int)]
frequency xs = toList (fromListWith (+) [(x, 1) | x <- xs])

sortUniq :: Ord a => [a] -> [a]
sortUniq = sort . nubOrd

getSleepingTuples_ :: [(Guard, (Int, Int))] -> [Event] -> [(Guard, (Int, Int))]
getSleepingTuples_ acc [] = acc
getSleepingTuples_ acc ((Start _ g):(Sleep st):(Wakeup wt):xs) = getSleepingTuples_ ((g,((minute st),(minute wt))):acc) xs
getSleepingTuples_ acc (x:xs) = getSleepingTuples_ acc xs
--  where rest = trace (show acc)
getSleepingTuples = getSleepingTuples_ []

resolveMinutes_ :: [Int] -> [(Guard, (Int, Int))] -> [Int]
resolveMinutes_ acc [] = acc
resolveMinutes_ acc ((_,(f,t)):xs) = resolveMinutes_  (merge [f..(pred t)] acc) xs

resolveMinutes = resolveMinutes_ []

getSleepingMinutesPerGuard :: [(Guard, (Int, Int))] -> [(Guard, [(Int)])]
getSleepingMinutesPerGuard g = map (\((x,y):xs) -> (x,resolveMinutes ((x,y):xs))) slots
  where
    slots = map (\a -> (filter (\(y,_) -> y == a)) g) guards -- Sleeping slots per guard
    guards = sortUniq $ map (\(x,_) -> x) g

getMostFrequentMinute :: [(Int,Int)] -> Int
getMostFrequentMinute ((x,y):[]) = x
getMostFrequentMinute ((a,b):(c,d):xs)
  | b > d = getMostFrequentMinute ((a,b):xs)
  | otherwise = getMostFrequentMinute ((c,d):xs)

getMostSleepingGuard :: [(Guard,Int)] -> Guard
getMostSleepingGuard ((a,b):[]) = a
getMostSleepingGuard ((a,b):(c,d):xs)
  | b > d = getMostSleepingGuard ((a,b):xs)
  | otherwise = getMostSleepingGuard ((c,d):xs)

getTargetGuard x = (gid mostSleepingGuard) * min
  where
    min = getMostFrequentMinute $ frequency mins
    mins = head $ map (\(x,y) -> y) $ filter (\(x,y) -> x == mostSleepingGuard) sleepMinsPerGuard
    hours = head $ map (\(x,y) -> y) $ filter (\(x,y) -> x == mostSleepingGuard) totalSleepMinsPerGuard
    mostSleepingGuard = getMostSleepingGuard totalSleepMinsPerGuard
    totalSleepMinsPerGuard = map (\(x,y) -> (x,(length y))) sleepMinsPerGuard
    sleepMinsPerGuard = getSleepingMinutesPerGuard sleepTuples
    sleepTuples = getSleepingTuples events
    starts = filter isStartEvent events
    events = sort . (map convertToEvent) $ x

main = forever $ do
    input <- getContents
    putStrLn $ show . getTargetGuard $ lines input