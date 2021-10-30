class stack():
    accumulatedtstack = []
    def __init__(self,val):
        self.items = []
        self.value = val
        self.items.append(val)
        stack.accumulatedtstack.append(val)


test1 = stack(5)
print(stack.accumulatedtstack)
print(test1.items)

test2 = stack(0)
print(stack.accumulatedtstack)
print(test2.items)

print(stack.__dict__)