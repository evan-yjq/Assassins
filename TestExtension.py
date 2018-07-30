# encoding:utf-8
# 测试拓展
# create by ye jiaquan in 2018/07/18
import argparse
import time
import json
import TestUtils as utils
from TestUtils import TestInfo as info
import Settings as st
#
# import sys
#
# reload(sys)
# sys.setdefaultencoding("utf8")

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

    # 解决中文乱码
    # setting = str(args.setting).decode('mbcs').encode('utf8')
    # serverName = str(args.serverName).decode('mbcs').encode('utf8')
    # apiKey = str(args.apiKey).decode('mbcs').encode('utf8')
    # params = str(args.params).decode('mbcs').encode('utf8')
    setting = str(args.setting)
    serverName = str(args.serverName)
    apiKey = str(args.apiKey)
    params = str(args.params)

    st.setSetting("./demo/settings/" + setting + ".yaml")
    # 初始化总时间
    t = 0
    max = 0
    min = 0

    print "{"
    edit = {}
    try:
        edit = json.loads(params)
        for i in edit:
            if i == 'sys':
                utils.autoSys(edit[i])
                edit[i] = st.settings['sys'][edit[i]]
    except:
        print '"log":"解析参数出错",'
        pass
    test = info(serverName, apiKey, edit)
    size = int(args.cnt)
    # for i in testNo:
    for i in range(size):
        # 设置开始计时时间
        print '"test%s":{' % i
        start = int(round(time.time() * 1000))
        # 请求数据
        result = utils.selectApi(test.setting, test.api, test.edit)
        # 设置结束计时时间
        stop = int(round(time.time() * 1000))
        result = '"请求结果":"%s",' % result
        result = result.replace('"{', '{')
        result = result.replace('}"', '}')
        print result
        space = utils.logTimeConsum(desc='"耗时":"%s"', start=start, stop=stop)
        print "},"

        if i == 0:
            min = space
        if max < space:
            max = space
        if min > space:
            min = space
        t += space

    utils.logTimeConsum(desc='"总耗时":"%s"', space=t)
    # 平均值去掉最小值与最大值(因为第一次连接耗时长)
    if size > 2:
        utils.logTimeConsum(desc=',"去最值平均耗时":"%s"', space=(t - max - min) / (size - 2))
    print "}"
