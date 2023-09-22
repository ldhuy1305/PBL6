
try:
    def create(n, m):
        s = 0
        for i in range(m):
            s = s * 10 + n
        return s

    n = int(input())
    m = n
    cs_max = n % 10
    c, max_value = 1, -1

    while m >= 10:
        c += 1
        max_value = (m % 10) if m % 10 > max_value else max_value
        m //= 10

    if max_value < m:
        print(create(m, c) - n)
    else:
        print(create(m + 1, c) - n)

except EOFError as e:
    print(e)