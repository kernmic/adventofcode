import Control.Monad
import Data.Char

hasLetterNTimes :: String -> Int -> Char -> Bool
hasLetterNTimes [] n _ = n == 0
hasLetterNTimes (x:xs) n l
  | x == l = hasLetterNTimes xs (n-1) l
  | otherwise = hasLetterNTimes xs n l

hasRepeatingLetter :: Int -> String -> Bool
hasRepeatingLetter n w = any (True==) $ map (hasLetterNTimes w n) w

getChecksum :: [String] -> Int
getChecksum ids = (length $ filter (hasRepeatingLetter 2) ids) * (length $ filter (hasRepeatingLetter 3) ids)

difference_ :: Int -> String -> String -> Int
difference_ acc [] y = acc + length y
difference_ acc y [] = acc + length y
difference_ acc (x:xs) (y:ys)
  | x /= y = difference_ (acc + 1) xs ys
  | otherwise = difference_ acc xs ys

difference = difference_ 0

common_ :: String -> String -> String -> String
common_ acc [] _ = reverse acc
common_ acc _ [] = reverse acc
common_ acc (x:xs) (y:ys)
  | x == y = common_ (x:acc) xs ys
  | otherwise = common_ acc xs ys
common = common_ ""

getCorrectBoxIdsCommonLetters :: [String] -> String
getCorrectBoxIdsCommonLetters ids = common (filtered !! 0) (filtered !! 1)
  where filtered = map head $ filter ((/=0) . length) $ map (\w -> filter (\x -> (difference x w) == 1) ids) ids

main = forever $ do
    input <- getContents
    putStrLn "checksum"
    putStrLn $ show . getChecksum $ lines input
    putStrLn "common letters"
    putStrLn $ getCorrectBoxIdsCommonLetters $ lines input