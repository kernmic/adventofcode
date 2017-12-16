import module_16_1
letters = module_16_1.letters

# This code will run for days...

for i in range(1,1000):
    if i%100 == 0:
        print(i)
    for instruction in module_16_1.instructions:
        letters = module_16_1.commands[instruction[0]](instruction[1:len(instruction)],letters)

print("".join(letters));