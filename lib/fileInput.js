const fs = require('fs');
const path = require('path');
// 这个文件用来生成文件
class File {
  constructor(app) {
    this.host = app.config.swagger.host;
    this.port = app.config.swagger.port;
    this.fileName = app.config.swagger.fileName;
    this.appFile = app.config.swagger.appFile;
  }
  fileWriter(){
    this.filePublic();
    this.fileSwagger();
    this.fileCopy();
    this.fileRouter();
  }
  filePublic() {
    // 判断public文件是否存在
    const public_file = path.join(this.appFile,'public')
    fs.exists(public_file, function(exists) {
      if(!exists) {
        // 创建一个public文件夹
        fs.mkdirSync(public_file);
        
      }
    });
  }
  // 判断是否有swagger文件夹的存在，并且判断里面的文件是否存在
  fileSwagger() {
    const swagger = path.join(this.appFile,'./public/swagger')
    fs.exists(swagger, function(exists) {
      if(!exists) {
        // 创建一个swagger文件夹
        fs.mkdirSync(swagger);
      }
    });
  }
  // 复制文件
  fileCopy() {
    // 先判断那些文件是否存在
    const src_list = ['favicon-16x16.png','favicon-32x32.png','index.html','oauth2-redirect.html','swagger-ui-bundle.js','swagger-ui-bundle.js.map','swagger-ui-standalone-preset.js','swagger-ui-standalone-preset.js.map','swagger-ui.css','swagger-ui.css.map','swagger-ui.js','swagger-ui.js.map']
    for(let item of src_list) {
      let to_path = path.join(this.appFile,`./public/swagger/${item}`)
      let src_path = path.join(__dirname,`./swagger/${item}`)
      fs.exists(to_path, function(exists) {
        if(!exists) {
          // 复制文件
          fs.writeFileSync(to_path, fs.readFileSync(src_path));
        }
      })
    }
  }
  // 写入路由文件
  fileRouter() {
    //判断有没有路由文件
    let path_router = path.join(this.appFile,'router')
    fs.exists(path_router, function(exists) {
      if(!exists) {
        fs.mkdirSync(path_router);
      }
    })
    // 写入路由文件
    const router_data = `'use strict';
const tagName = '测试swagger2';
const tagdescription = '测试swagger2备注';
module.exports = app => {
  const rou = app.middleware.routermidd();
  const rou2 = app.middleware.routermidd();
  const router = {
    tag: tagName,
    description: tagdescription,
    routers: {
      '/test_swagger2': {
        summary: '用户列表',
        description: '',
        tag: tagName,
        method: 'post',
        header: 'token',
        middleware: [ rou, rou2 ],
        action: app.controller.home.index2,
        data: {
          string2: { type: 'string', default: 'abc' },
        },
        query: {
          token: true,
          token2: false,
        },
      },
    },
  };
  return router;
};`
    // 先判断有没有这个文件
    let patt = /\.js/igm
    let routerdata_path
    if(patt.test(this.fileName)){
      routerdata_path = path.join(this.appFile,`./router/${this.fileName}`)
    } else {
      routerdata_path = path.join(this.appFile,`./router/${this.fileName}.js`)
    }
    fs.writeFileSync(routerdata_path, router_data);
  }
}

module.exports = File
