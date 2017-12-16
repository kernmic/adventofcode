instructions = open('./captcha', 'r').read().split(",")
letters = list(map(chr, range(97, (97+16))))

def spin(params, list):
    offset = int(params)
    return list[len(list)-offset:len(list)] + list[0:len(list)-offset]

def exchange(params, list):
    indices = [ int(x) for x in params.split("/") ]
    tmp = list[indices[0]]
    list[indices[0]] = list[indices[1]]
    list[indices[1]] = tmp
    return list

def partner(params, list):
    programs = params.split("/")
    return exchange(str(list.index(programs[0])) + "/" + str(list.index(programs[1])), list)

commands = {
    "s": spin,
    "x": exchange,
    "p": partner
}

for instruction in instructions:
    letters = commands[instruction[0]](instruction[1:len(instruction)],letters)

print("".join(letters))