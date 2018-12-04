using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;

namespace _chronal_calibration
{
    class MainClass
    {
        public static void Main(string[] args)
        {
            ChronicalCalibration chronical = new ChronicalCalibration();

            Console.WriteLine("Part 1");
            Console.WriteLine(chronical.Part1(InputReader.ReadConfiguration("1_chronal_calibration_1")));

            Console.WriteLine("Part 2");
            Console.WriteLine(chronical.Part2(InputReader.ReadConfiguration("1_chronal_calibration_1")));
        }
    }

    class InputReader
    {
        public static Queue ReadConfiguration(string name)
        {
            FileStream input = new FileStream("../0_inputs/" + name + ".txt", FileMode.Open);
            StreamReader streamReader = new StreamReader(input);
            Queue queue = new Queue();
            string line = streamReader.ReadLine();
            while (line != null)
            {
                queue.Enqueue(line);
                line = streamReader.ReadLine();
            }
            streamReader.Close();
            return queue;
        }
    }

    class ChronicalCalibration
    {

        public int Part1(Queue input)
        {
            checked
            {
                int cumulator = 0;
                foreach (string line in input)
                {
                    cumulator += Int32.Parse(line);
                }
                return cumulator;
            }
        }

        public int Part2(Queue input)
        {
            checked
            {
                int cumulator = 0;
                List<int> cumulatorHistory = new List<int>
                {
                    cumulator
                };
                while (true)
                {
                    foreach (string line in input)
                    {
                        cumulator += Int32.Parse(line);
                        if (cumulatorHistory.Contains(cumulator))
                        {
                            Console.Write(cumulator + "\t");
                            return cumulator;
                        }
                        cumulatorHistory.Add(cumulator);
                    }
                }
            }
        }


    }
}
