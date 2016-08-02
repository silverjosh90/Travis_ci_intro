var Directory = function (name) {
  this.name = name
  this.files = {}
  this.linked = {}
};

Directory.prototype.ls = function() {
  var arr = []
  Object.keys(this.files).map((function(file){
    arr.unshift(this.files[file].name)
  }).bind(this))
  return arr
}

Directory.prototype.write = function(name, content) {
  this.files[name] = {}
  this.files[name].name = name
  this.files[name].content = content
  this.linkAll()
}

Directory.prototype.ls_la = function() {
  var arr = []
  Object.keys(this.files).map((function(file){
    arr.unshift(this.files[file].name + " - " + this.files[file].content.length)
  }).bind(this))
  return arr
}

Directory.prototype.cat = function(name) {
  return this.files[name].content
}

Directory.prototype.mv = function(name, replace) {
  obj = {}
  var self = this
   Object.keys(this.files).forEach(function(val){
    if(self.files[val].name == name) {
      obj[replace] = {
        name: replace,
        content: self.files[val].content
      }
    }
    else {
      obj[self.files[val].name] = self.files[val]
    }
  })
  this.files = obj
}

Directory.prototype.cp = function(firstFile, secondFile) {
  this.write(secondFile, this.files[firstFile].content)
  var obj = {}
  var self = this
  Object.keys(this.files).forEach(function(val){
    if(self.files[val].name !== firstFile){
      obj[val] = self.files[val]
    }
  })
  this.files = obj
}

Directory.prototype.ln_s = function(firstLink, secondLink) {
  this.linked[firstLink] = secondLink
}

Directory.prototype.linkAll = function() {
  for(key in this.linked) {
    var val = this.linked[key]
    if(!this.files[val]) {
      this.write(val, this.files[key])
    }
    else {
      this.files[val].content = this.files[key].content
    }
    var self = this
    var obj = {}
    Object.keys(this.files).forEach(function(fileKey){
      if(self.files[fileKey].name !== key) {
        obj[fileKey] = self.files[fileKey]
      }
    })
    obj[key] = this.files[key]
    this.files = obj
  }
}



module.exports = Directory;
