# 扫福瑞叫爸爸

## 目录

- [免责声明](#免责声明)
- [截图](#截图)
- [如何使用](#如何使用)
  - [在线查看](#在线查看)
  - [本地部署](#本地部署)

## 免责声明

# 本项目纯属娱乐，所有内容（包括文本匹配、图片及特效）均为虚构。请勿将本工具用于任何恶意攻击或侵犯他人权益的行为，使用者需自行承担相关责任。

## 截图
![](./screenshot/1.png)

![](./screenshot/2.png)

## 如何使用

### 在线查看

浏览器访问 `https://oiiai.github.io/sofree/` 即可 -> [Click Me](https://oiiai.github.io/sofree/)

如果无法访问或加载缓慢，请检查网络环境或使用VPN

### 本地部署

请确保您的电脑已下载并安装 [Python](https://python.org/) 和 [Git](https://git-scm.com/) ，且端口 `8800` 未被占用

```bash
git clone https://github.com/Oiiai/sofree.git
cd sofree
python -m http.server 8800
```

如何检查 `8800` 端口是否被占用？

#### Windows

```bash
netstat -ano | findstr :8800    # 若无输出，则表示8800未被占用
```

#### MacOS

```bash
sudo lsof -i :8800    # 若无输出，则表示8800未被占用
```

#### Linux

```bash
sudo netstat -tunlp | grep :8800    # 若无输出，则表示8800未被占用
```

启动后，浏览器打开 `http://localhost:8800/index.html` 即可访问


