# encoding:utf-8
# 测试拓展
# create by ye jiaquan in 2018/07/18
import time
import TestUtils as tu


# 主方法
if __name__ == '__main__':
    # 初始化总时间
    t = 0
    max = 0
    min = 0

    # 测试设置列表
    tests = [
        ['openapi_test', 'CrtBidAct', []],
        ['openapi_test', 'EBidPrice', {'price': ''}],
        ['openapi_test', 'CrtTpl', []],
        ['openapi_test', 'CrtAct', []],
        ['openapi_test', 'EBidStatus', []],
        ['openapi_test', 'GetBidInfo', []],
        ['openapi_test', 'GetCurrentBidInfo', []],
        ['openapi_test', 'GetBidAct', []],
        ['openapi_test', 'GetActInfo', []],
        ['openapi_test', 'GetTagsInfo', []]
    ]

    # 按顺序测试
    # testNo = range(2)
    #
    # 自己挑选测试
    testNo = [1, 1, 1]
    #
    # 多个api测试多次
    # testNo = range(len(tests))
    #
    # 单个api测试多次
    # n:测试次数
    # testNo = range(n)

    for _ in testNo:
        # 自定义参数
        if tests[_][1] == 'EBidPrice':
            tests[_][2]['price'] = tu.randomPrice(0.00, 3.00)
        # 设置开始计时时间
        start = int(round(time.time() * 1000))
        # 多个api测试多次
        result = tu.selectApi(tests[_][0], tests[_][1], tests[_][2])
        # 单个api测试多次
        # result = selectApi(tests[0][0], tests[0][1], tests[0][2])
        # 设置结束计时时间
        stop = int(round(time.time() * 1000))
        print('请求结果：\n'+result)
        space = tu.logTimeConsum('耗时：', start, stop)
        if _ == 0:
            min = space
        if max < space:
            max = space
        if min > space:
            min = space
        t += space

    tu.logTimeConsum('总耗时：', space=t)
    # 平均值去掉最小值与最大值(因为第一次连接耗时长)
    if len(testNo) > 2:
        tu.logTimeConsum('去最值平均耗时：', space=(t - max - min) / (len(testNo) - 2))
