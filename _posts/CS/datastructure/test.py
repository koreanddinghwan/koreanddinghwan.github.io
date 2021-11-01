class Time:
    def __init__(self, hour, minute, second):
        self.hour = hour
        self.minute = minute
        self.second = second

    
    # @classmethod
    # def from_string(cls, string):
    #     hour,minute,second = map(int, string.split(":"))
    #     return cls(hour,minute,second)

    @staticmethod
    def from_string(string):
        hour,minute,second = map(int, string.split(":"))
        return Time(hour,minute,second)

        
    @staticmethod
    def is_time_valid(string):
        hour,minute,second = map(int, string.split(":"))
        return hour <= 24 and hour >= 0 and minute <= 59 and minute >= 0 and second >= 0 and second <= 60





# time_string = input()

# if Time.is_time_valid(time_string): #정적메서드, 입력받아 truefalse리턴
#     t = Time.from_string(time_string) #t라는 인스턴스를 만들어줘야한다. 
#     #인스턴스를 어떻게 만들었었지?-->t = Time(hour,minute,second)
#     #from_string은 리턴값으로 
#     print(t.hour, t.minute, t.second)
# else:
#     print('잘못된 시간 형식입니다.')


print(Time.__name__)