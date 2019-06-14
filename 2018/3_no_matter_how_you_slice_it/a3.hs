import Control.Monad
import Data.List
import Data.List.Split
import Data.Map (fromListWith, toList)

-- #1 @ 1,3: 4x4
data Claim = Claim { cid :: Int
                     , left :: Int
                     , top :: Int
                     , width :: Int
                     , height :: Int
                     } deriving (Show)


convertToClaim :: String -> Claim
convertToClaim x = Claim (raw !! 0) (raw !! 1) (raw !! 2) (raw !! 3) (raw !! 4)
  where raw = map read $ filter ((>0) . length) $ splitOneOf "# ,:@x" x

convertToClaims :: [String] -> [Claim]
convertToClaims x = map convertToClaim x

getClaimedInches :: Claim -> [(Int,Int)]
getClaimedInches c = join $
  map (\x -> map (\y -> (x,y)) $ (take (height c) [y | y <- [0..], y >= (top c)]))
  (take (width c) [x | x <- [0..], x >= (left c)])

frequency :: (Ord a) => [a] -> [(a, Int)]
frequency xs = toList (fromListWith (+) [(x, 1) | x <- xs])

getMultipleUsedFields :: [Claim] -> [(Int,Int)]
getMultipleUsedFields c = map (\(x,_) -> x) $ filter (\(_,y) -> y > 1) $ frequency $ join $ map getClaimedInches $ c

getMultipleUsedInches :: [Claim] -> Int
getMultipleUsedInches c = length $ getMultipleUsedFields c

getNoneOverlappingClaim_ :: [(Int,Int)] -> [Claim] -> Int
getNoneOverlappingClaim_ _ [] = 0
getNoneOverlappingClaim_ overUsedFields (x:xs)
  | (any (\y -> y `elem` overUsedFields)) $ getClaimedInches x = getNoneOverlappingClaim_ overUsedFields xs
  | otherwise = cid x

getNoneOverlappingClaim :: [Claim] -> Int
getNoneOverlappingClaim b = getNoneOverlappingClaim_ (getMultipleUsedFields b) b

main = forever $ do
    input <- getContents
    putStrLn "claims"
    putStrLn $ show . getMultipleUsedInches $ convertToClaims $ lines input
    putStrLn "not overlapping claim"
    putStrLn $ show . getNoneOverlappingClaim $ convertToClaims $ lines input