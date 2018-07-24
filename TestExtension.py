# encoding:utf-8
# 测试拓展
# create by ye jiaquan in 2018/07/18
import time
import TestUtils as utils
from TestUtils import TestInfo as info

# 主方法
if __name__ == '__main__':
    util = utils.Utils("./openapi_settings.yaml")
    # 初始化总时间
    t = 0
    max = 0
    min = 0

    # 测试设置列表
    tests = [
        info('test', 'tdtest', 'CrtTpl', {}),
        info('test', 'tdtest', 'CrtAct', {}),
        info('test', 'tdtest', 'CrtBid', {}),
        info('test', 'tdtest', 'EBidSt', {}),
        info('prod', 'tdtest', 'EBidPr', {'price': ''}),
        info('test', 'tdtest', 'GBidIf', {}),
        info('test', 'tdtest', 'GCBdIf', {}),
        info('test', 'tdtest', 'GBdAIf', {}),
        info('test', 'tdtest', 'GActIf', {}),
        info('test', 'tdtest', 'GTagIf', {})
    ]

    # 按顺序测试
    # testNo = range(2)
    #
    # 自己挑选测试
    testNo = [1]

    # 多个api测试多次
    # testNo = range(len(tests))
    #
    # 单个api测试多次
    # n:测试次数
    # testNo = range(n)

    for i in testNo:
        test = tests[i]
        # 自定义参数
        if test.api == 'EBidPrice':
            test.edit['price'] = utils.randomPrice(0.00, 3.00)
        # 设置开始计时时间
        start = int(round(time.time() * 1000))
        # 请求数据
        result = util.selectApi(test.setting, test.signUser, test.api, test.edit)
        # 设置结束计时时间
        stop = int(round(time.time() * 1000))
        print "请求结果：\n %s" % result
        space = utils.logTimeConsum(desc="耗时：", start=start, stop=stop)

        if i == 0:
            min = space
        if max < space:
            max = space
        if min > space:
            min = space
        t += space

    utils.logTimeConsum(desc="总耗时：", space=t)
    # 平均值去掉最小值与最大值(因为第一次连接耗时长)
    if len(testNo) > 2:
        utils.logTimeConsum(desc="去最值平均耗时：", space=(t - max - min) / (len(testNo) - 2))
