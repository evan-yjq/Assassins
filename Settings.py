# encoding:utf-8
# 将已完成的方法转移到这里
# create by ye jiaquan in 2018/07/23
import hashlib
import time
import yaml


class Settings:
    def __init__(self):
        with open("./openapi_settings.yaml", "r") as yaml_file:
            self.settings = yaml.load(yaml_file.read())

    # done(开发完成)
    # 自动生成sys
    # create by ye jiaquan in 2018/07/19
    def autoSys(self):
        millis = int(round(time.time() * 1000))
        settings = self.settings['settings']
        sys = self.settings['sys']
        strs = str(millis) + "&" + \
               str(settings['sysSetting']['pwd']) + "&" + \
               str(sys[settings['sysSetting']['user']]['city']) + "&" + \
               str(sys[settings['sysSetting']['user']]['county']) + "&" + \
               str(sys[settings['sysSetting']['user']]['industry']) + "&" + \
               str(sys[settings['sysSetting']['user']]['appkey'])
        sys[settings['sysSetting']['user']]['timestamp'] = str(millis)
        sys[settings['sysSetting']['user']]['sign'] = hashlib.md5(strs.encode('utf-8').lower()).hexdigest()
