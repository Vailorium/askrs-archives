import os, json, errno

base = "../game_files/"
save_base = "../../server/src/data/"

def getDataFromFolder(folder):
  files = []
  for filename in os.listdir(base+folder):
    jsonFile = open(base+folder+'/'+filename, encoding='utf-8')
    files.append(json.load(jsonFile))
    jsonFile.close()
  return files

def saveJSONDataToFile(data, path):
  if not os.path.exists(os.path.dirname(save_base+path)):
      try:
          os.makedirs(os.path.dirname(save_base+path))
      except OSError as exc: # Guard against race condition
          if exc.errno != errno.EEXIST:
              raise

  with open(save_base+path, 'w', encoding='utf-8') as outFile:
    json.dump(data, outFile, ensure_ascii=False)

def getJSONDataFromFile(path):
  jsonFile = open(base+path, encoding='utf-8')
  return json.load(jsonFile)

def getWalkData(path, blacklistDirs=[]):
  data = []
  for filename in os.listdir(base+path):
    if os.path.isdir(base+path + '/' + filename):
      if filename not in blacklistDirs:
        data = data + getWalkData(base+path + '/' + filename, blacklistDirs)
    else:
      jsonData = getJSONDataFromFile(base+path + '/' + filename)
      data.append(jsonData)
  return data