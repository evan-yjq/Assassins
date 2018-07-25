# encoding:utf-8
# 测试拓展
# create by ye jiaquan in 2018/07/18
import sys
import time
import json
import TestUtils as utils
from TestUtils import TestInfo as info

# 主方法
if __name__ == '__main__':
    util = utils.Utils("./demo/settings/" + sys.argv[1] + ".yaml")
    # 初始化总时间
    t = 0
    max = 0
    min = 0

    # 测试设置列表
    # tests = [
    #     # 创建
    #     info('test', 'tdtest', 'CrtTpl', {}),
    #     info('test', 'tdtest', 'CrtAct', {}),
    #     info('test', 'tdtest', 'CrtBid', {}),
    #     # 修改
    #     info('test', 'tdtest', 'EBidSt', {}),
    #     info('prod', 'tdtest', 'EBidPr', {'price': ''}),
    #     # 获取
    #     info('test', 'tdtest', 'GBidIf', {}),
    #     info('test', 'tdtest', 'GCBdIf', {}),
    #     info('test', 'tdtest', 'GBdAIf', {}),
    #     info('test', 'tdtest', 'GActIf', {}),
    #     # 耗时，建议单独测
    #     info('test', 'tdtest', 'GTagIf', {})
    # ]

    # 按顺序测试
    # testNo = range(2)
    #
    # 自己挑选测试
    # testNo = [4]

    # 多个api测试多次
    # testNo = range(len(tests))
    #
    # 单个api测试多次
    # n:测试次数
    # testNo = range(n)
    print "{"
    edit = {}
    try:
        edit = json.loads(sys.argv[6])
    except:
        pass
    test = info(sys.argv[2], sys.argv[3], sys.argv[4], edit)
    size = int(sys.argv[5])
    # for i in testNo:
    for i in range(size):
        # test = tests[i]
        # 自定义参数
        # if test.api == 'EBidPr':
        #     test.edit['price'] = utils.randomPrice(0.00, 3.00)
        # 设置开始计时时间
        print "test%s:{" % i
        start = int(round(time.time() * 1000))
        # 请求数据
        result = util.selectApi(test.setting, test.signUser, test.api, test.edit)
        # 设置结束计时时间
        stop = int(round(time.time() * 1000))
        print "请求结果:%s," % result
        space = utils.logTimeConsum(desc="耗时:%s,", start=start, stop=stop)
        print "}"

        if i == 0:
            min = space
        if max < space:
            max = space
        if min > space:
            min = space
        t += space

    utils.logTimeConsum(desc="总耗时:%s,", space=t)
    # 平均值去掉最小值与最大值(因为第一次连接耗时长)
    # if len(testNo) > 2:
    #     utils.logTimeConsum(desc="去最值平均耗时：", space=(t - max - min) / (len(testNo) - 2))
    if size > 2:
        utils.logTimeConsum(desc="去最值平均耗时:%s", space=(t - max - min) / (size - 2))
    print "}"
