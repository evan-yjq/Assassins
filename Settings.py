# encoding:utf-8
# 读取设置，自动生成数据
# create by ye jiaquan in 2018/07/23

import yaml

settings = {}


def setSetting(name):
    global settings
    with open(name, "r") as yaml_file:
        settings = yaml.load(yaml_file.read())
