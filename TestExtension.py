# encoding:utf-8
# 测试拓展
# create by ye jiaquan in 2018/07/18
import argparse
import time
import json
import TestUtils as utils
from TestUtils import TestInfo as info
import Settings as st

# 主方法
if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    # 添加参数
    parser.add_argument("setting")
    parser.add_argument("serverName")
    # parser.add_argument("signUser")
    parser.add_argument("apiKey")
    parser.add_argument("cnt")
    parser.add_argument('params')
    args = parser.parse_args()

    st.setSetting("./demo/settings/" + args.setting + ".yaml")
    # 初始化总时间
    t = 0
    max = 0
    min = 0

    print "{"
    edit = {}
    try:
        edit = json.loads(args.params)
        for i in edit:
            if i == 'sys':
                utils.autoSys(edit[i])
                edit[i] = st.settings['sys'][edit[i]]
    except:
        pass
    test = info(args.serverName, args.apiKey, edit)
    size = int(args.cnt)
    # for i in testNo:
    for i in range(size):
        # test = tests[i]
        # 自定义参数
        # if test.api == 'EBidPr':
        #     test.edit['price'] = utils.randomPrice(0.00, 3.00)
        # 设置开始计时时间
        print '"test%s":{' % i
        start = int(round(time.time() * 1000))
        # 请求数据
        result = utils.selectApi(test.setting, test.api, test.edit)
        # 设置结束计时时间
        stop = int(round(time.time() * 1000))
        print '"请求结果":%s,' % result
        space = utils.logTimeConsum(desc='"耗时":"%s",', start=start, stop=stop)
        print "}"

        if i == 0:
            min = space
        if max < space:
            max = space
        if min > space:
            min = space
        t += space

    utils.logTimeConsum(desc='"总耗时":"%s"', space=t)
    # 平均值去掉最小值与最大值(因为第一次连接耗时长)
    # if len(testNo) > 2:
    #     utils.logTimeConsum(desc="去最值平均耗时：", space=(t - max - min) / (len(testNo) - 2))
    if size > 2:
        utils.logTimeConsum(desc='",去最值平均耗时":"%s"', space=(t - max - min) / (size - 2))
    print "}"
