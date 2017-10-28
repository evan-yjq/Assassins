# encoding:utf-8

Checkerboard = []
can_move_flag = [
    [[0, 0, 1, 1, 1, 0, 0, 0], [0, 0, 1, 0, 1, 0, 1, 0], [0, 0, 1, 1, 1, 1, 1, 0], [0, 0, 1, 0, 1, 0, 1, 0],
     [0, 0, 1, 1, 1, 1, 1, 0], [0, 0, 1, 0, 1, 0, 1, 0], [0, 0, 1, 1, 1, 1, 1, 0], [0, 0, 1, 0, 1, 0, 1, 0],
     [0, 0, 0, 0, 1, 1, 1, 0]],
    [[1, 0, 1, 0, 1, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 1, 0, 1, 0, 1, 0], [1, 1, 1, 1, 1, 1, 1, 1],
     [1, 0, 1, 0, 1, 0, 1, 0], [1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 1, 0, 1, 0, 1, 0], [1, 1, 1, 1, 1, 1, 1, 1],
     [1, 0, 0, 0, 1, 0, 1, 0]],
    [[1, 1, 1, 1, 1, 0, 0, 0], [1, 0, 1, 0, 1, 0, 1, 0], [1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 1, 0, 1, 0, 1, 0],
     [1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 1, 0, 1, 0, 1, 0], [1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 1, 0, 1, 0, 1, 0],
     [1, 0, 0, 0, 1, 1, 1, 1]],
    [[1, 0, 1, 0, 1, 0, 0, 0], [1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 1, 0, 1, 0, 1, 0], [1, 1, 1, 1, 1, 1, 1, 1],
     [1, 0, 1, 0, 1, 0, 1, 0], [1, 1, 1, 1, 1, 1, 1, 1], [1, 0, 1, 0, 1, 0, 1, 0], [1, 1, 1, 1, 1, 1, 1, 1],
     [1, 0, 0, 0, 1, 0, 1, 0]],
    [[1, 1, 1, 0, 0, 0, 0, 0], [1, 0, 1, 0, 0, 0, 1, 0], [1, 1, 1, 0, 0, 0, 1, 1], [1, 0, 1, 0, 0, 0, 1, 0],
     [1, 1, 1, 0, 0, 0, 1, 1], [1, 0, 1, 0, 0, 0, 1, 0], [1, 1, 1, 0, 0, 0, 1, 1], [1, 0, 1, 0, 0, 0, 1, 0],
     [1, 0, 0, 0, 0, 0, 1, 1]]]
can_move = []


# 初始化棋盘
def init():
    global Checkerboard
    Checkerboard = [[-1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, -1, -1, -1, -1, -1, -1, -1, -1],
                    [-1, 1, -1, 1, 0, -1, 1, -1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1]]


# 检测哪些棋子可以走动
def scan(m, flag, x, y):
    global can_move
    if flag == 1:
        for i in range(len(Checkerboard)):
            for j in range(len(Checkerboard[i])):
                if Checkerboard[i][j] == m:
                    can_walk = walk(i, j, m)
                    if len(can_walk) != 0:
                        can_move.append([[i, j], can_walk])
    else:
        can_walk = walk(x, y, m)
        if len(can_walk) != 0:
            can_move.append([[x, y], can_walk])
    if len(can_move) > 0:
        print can_move


# 检测那些棋子可以往哪里走动
def get(x, y, m, i):
    if i == 1 and Checkerboard[x - 1][y] == 0:
        if x >= 2 and Checkerboard[x - 2][y] == -m:
            return [x - 1, y]
        elif x <= 3 and Checkerboard[x + 1][y] == -m:
            return [x - 1, y]
    if i == 5 and Checkerboard[x + 1][y] == 0:
        if x <= 2 and Checkerboard[x + 2][y] == -m:
            return [x + 1, y]
        elif x >= 1 and Checkerboard[x - 1][y] == -m:
            return [x + 1, y]
    if i == 7 and Checkerboard[x][y - 1] == 0:
        if y >= 2 and Checkerboard[x][y - 2] == -m:
            return [x, y - 1]
        elif y <= 7 and Checkerboard[x][y + 1] == -m:
            return [x, y - 1]
    if i == 3 and Checkerboard[x][y + 1] == 0:
        if y <= 6 and Checkerboard[x][y + 2] == -m:
            return [x, y + 1]
        elif y >= 1 and Checkerboard[x][y - 1] == -m:
            return [x, y + 1]
    if i == 8 and Checkerboard[x - 1][y - 1] == 0:
        if x >= 2 and y >= 2 and Checkerboard[x - 2][y - 2] == -m:
            return [x - 1, y - 1]
        elif x <= 3 and y <= 7 and Checkerboard[x + 1][y + 1] == -m:
            return [x - 1, y - 1]
    if i == 4 and Checkerboard[x + 1][y + 1] == 0:
        if x <= 2 and y <= 6 and Checkerboard[x + 2][y + 2] == -m:
            return [x + 1, y + 1]
        elif x >= 1 and y >= 1 and Checkerboard[x - 1][y - 1] == -m:
            return [x + 1, y + 1]
    if i == 2 and Checkerboard[x - 1][y + 1] == 0:
        if x >= 2 and y <= 6 and Checkerboard[x - 2][y + 2] == -m:
            return [x - 1, y + 1]
        elif x <= 3 and y >= 1 and Checkerboard[x + 1][y - 1] == -m:
            return [x - 1, y + 1]
    if i == 6 and Checkerboard[x + 1][y - 1] == 0:
        if x <= 2 and y >= 2 and Checkerboard[x + 2][y - 2] == -m:
            return [x + 1, y - 1]
        elif x >= 1 and y <= 7 and Checkerboard[x - 1][y + 1] == -m:
            return [x + 1, y - 1]


# 检测那些棋子可以吃掉哪些点
def loop(x, y, g, m):
    can_eat = []
    can_eat_opp = []
    cx = g[0] - x
    cy = g[1] - y
    ex = g[0]
    ey = g[1]
    eox = g[0]
    eoy = g[1]
    if cx <= 0:
        if cy <= 0:
            while ex > 0 and ey > 0:
                ex += cx
                ey += cy
                if Checkerboard[ex][ey] == 0 or Checkerboard[ex][ey] == m:
                    break
                can_eat.append([ex, ey])
            eox -= cx
            eoy -= cy
            while eox < 4 and eoy < 8:
                eox -= cx
                eoy -= cy
                if Checkerboard[eox][eoy] == 0 or Checkerboard[eox][eoy] == m:
                    break
                can_eat_opp.append([eox, eoy])
        elif cy > 0:
            while ex > 0 and ey < 8:
                ex += cx
                ey += cy
                if Checkerboard[ex][ey] == 0 or Checkerboard[ex][ey] == m:
                    break
                can_eat.append([ex, ey])
            eox -= cx
            eoy -= cy
            while eox < 4 and eoy > 0:
                eox -= cx
                eoy -= cy
                if Checkerboard[eox][eoy] == 0 or Checkerboard[eox][eoy] == m:
                    break
                can_eat_opp.append([eox, eoy])
    elif cx > 0:
        if cy <= 0:
            while ex < 4 and ey > 0:
                ex += cx
                ey += cy
                if Checkerboard[ex][ey] == 0 or Checkerboard[ex][ey] == m:
                    break
                can_eat.append([ex, ey])
            eox -= cx
            eoy -= cy
            while eox > 0 and eoy < 8:
                eox -= cx
                eoy -= cy
                if Checkerboard[eox][eoy] == 0 or Checkerboard[eox][eoy] == m:
                    break
                can_eat_opp.append([eox, eoy])
        elif cy > 0:
            while ex < 4 and ey < 8:
                ex += cx
                ey += cy
                if Checkerboard[ex][ey] == 0 or Checkerboard[ex][ey] == m:
                    break
                can_eat.append([ex, ey])
            eox -= cx
            eoy -= cy
            while eox > 0 and eoy > 0:
                eox -= cx
                eoy -= cy
                if Checkerboard[eox][eoy] == 0 or Checkerboard[eox][eoy] == m:
                    break
                can_eat_opp.append([eox, eoy])
    g.append(can_eat)
    g.append(can_eat_opp)
    return g


# 检测那些棋子可以往哪里走动
def walk(x, y, m):
    can_walk = []
    for i in range(8):
        if can_move_flag[x][y][i] == 1:
            g = get(x, y, m, i + 1)
            if g is not None and len(g) > 0:
                g = loop(x, y, g, m)
                can_walk.append(g)
    return can_walk


# 绘制棋盘
def paint():
    for i in range(len(Checkerboard)):
        for j in range(len(Checkerboard[i])):
            if Checkerboard[i][j] == -1:
                print "●",
            elif Checkerboard[i][j] == 1:
                print "o",
            elif Checkerboard[i][j] == 2:
                print "*",
            else:
                print " ",
            if j < 8:
                print "-",
            else:
                print ""
        if i == 0 or i == 2:
            print "| \\ | / | \\ | / | \\ | / | \\ | / |"
        elif i == 1 or i == 3:
            print "| / | \\ | / | \\ | / | \\ | / | \\ |"


# init()
# scan(1)
# print can_move[0][1][0][2]
#

def start():
    global can_move
    init()
    m = 1
    flag = [1, 0]
    spot = [0, 0]
    while True:
        if flag[0] == 1 and flag[1] == 1:
            paint()
            print "游戏结束！"
            num = 0
            for lines in Checkerboard:
                for spo in lines:
                    print spo,
                    num += spo
            print num
            if num > 0:
                print "黑子胜"
            elif num < 0:
                print "白子胜"
            elif num == 0:
                print "平局"
            break
        if m == 1:
            scan(m, flag[0], spot[0], spot[1])
        else:
            scan(m, flag[1], spot[0], spot[1])
        if len(can_move) == 0:
            m = -m
            if m == 1:
                print "切换到玩家1"
                flag[0] = 1
            else:
                print "切换到玩家2"
                flag[1] = 1
            continue
        if m == 1:
            flag[0] = 0
        else:
            flag[1] = 0
        paint()
        a = input("选择第几个点：")
        if type(a) == int:
            if 0 < a <= len(can_move):
                a = a - 1
                spot = can_move[a][0]
                Checkerboard[spot[0]][spot[1]] = 0
                if len(can_move[a][1]) >= 2:
                    b = input("选择走动方向：")
                    if type(b) == int:
                        if 0 < b <= len(can_move[a]):
                            b = b - 1
                            spot[0] = can_move[a][1][b][0]
                            spot[1] = can_move[a][1][b][1]
                            Checkerboard[spot[0]][spot[1]] = m
                            if len(can_move[a][1][b][2]) >= 1 and len(can_move[a][1][b][3]) >= 1:
                                c = input("请选择吃掉前或后：前（1）后（2）")
                                if type(c) == int:
                                    if c == 1:
                                        for sp in can_move[a][1][b][2]:
                                            Checkerboard[sp[0]][sp[1]] = 0
                                    elif c == 2:
                                        for sp in can_move[a][1][b][3]:
                                            Checkerboard[sp[0]][sp[1]] = 0
                                    else:
                                        print "请输入范围内的编号"
                                else:
                                    print "请输入整数"
                            elif len(can_move[a][1][b][2]) >= 1:
                                for sp in can_move[a][1][b][2]:
                                    Checkerboard[sp[0]][sp[1]] = 0
                            elif len(can_move[a][1][b][3]) >= 1:
                                for sp in can_move[a][1][b][3]:
                                    Checkerboard[sp[0]][sp[1]] = 0
                        else:
                            print "请输入范围内的编号"
                    else:
                        print "请输入整数"
                else:
                    spot[0] = can_move[a][1][0][0]
                    spot[1] = can_move[a][1][0][1]
                    Checkerboard[spot[0]][spot[1]] = m
                    if len(can_move[a][1][0][2]) >= 1 and len(can_move[a][1][0][3]) >= 1:
                        c = input("请选择吃掉前或后：前（1）后（2）")
                        if type(c) == int:
                            if c == 1:
                                for sp in can_move[a][1][0][2]:
                                    Checkerboard[sp[0]][sp[1]] = 0
                            elif c == 2:
                                for sp in can_move[a][1][0][3]:
                                    Checkerboard[sp[0]][sp[1]] = 0
                            else:
                                print "请输入范围内的编号"
                        else:
                            print "请输入整数"
                    elif len(can_move[a][1][0][2]) >= 1:
                        for sp in can_move[a][1][0][2]:
                            Checkerboard[sp[0]][sp[1]] = 0
                    elif len(can_move[a][1][0][3]) >= 1:
                        for sp in can_move[a][1][0][3]:
                            Checkerboard[sp[0]][sp[1]] = 0
            else:
                print "请输入范围内的编号"
        else:
            print "请输入整数"
        can_move = []


start()
