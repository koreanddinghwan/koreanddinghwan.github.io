class Queue():
    def __init__(self):
        self.items = []
        self.front_index = 0

    def enqueue(self, value):
        self.items.append(value)

    def dequeue(self):
        if self.front_index == len(self.items):
            print('queue empty')
            return None
        else:
            returnvalue = self.items[self.front_index]
            self.front_index += 1
            return returnvalue

    def front(self):
        if self.front_index == len(self.items):
            print('queue empty')
        else:
            returnvalue = self.items[self.front_index]
            return returnvalue


class deque():
    def __init__(self):
        self.items = []
        self.front_value = 0

    def push(self, value):
        self.items.append(value)

    def pushleft(self, value):
        self.items.insert(self.front_value,value)

    def pop(self):
        if len(self.items) == self.front_value:
            print('queue is empty')
            return None
        else:
            return self.items.pop()

    def popleft(self):
        if len(self.items) == self.front_value:
            print('queue is empty')
            return None
        else:
            x = self.items[self.front_value]
            self.front_value += 1
            return x


