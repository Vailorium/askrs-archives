import Utils

# Hero
def handleHeroData():
  print("Loading Hero Data")
  walkedData = Utils.getWalkData('files/assets/Common/SRPG/Person')
  print("Hero Data Loaded")
  heroData = []
  print("Grouping Hero Data")
  for group in walkedData:
    for hero in group:
      heroData.append(hero)
  print("Saving data to server/data/heroes/hero_list.json")
  Utils.saveJSONDataToFile(heroData, 'heroes/hero_list.json')

# Skill
def handleSkillData():
  print("Loading Skill Data")
  walkedData = Utils.getWalkData('files/assets/Common/SRPG/Skill')
  print("Skill Data Loaded")
  skillData = []
  print("Grouping Skill Data")
  for group in walkedData:
    for skill in group:
      skillData.append(skill)
  print("Saving data to server/data/skills/skill_list.json")
  Utils.saveJSONDataToFile(skillData, 'skills/skill_list.json')

# Resplendent
def handleResplendentData():
  print("Loading Resplendent Data")
  walkedData = Utils.getWalkData('files/assets/Common/SubscriptionCostume')
  print("Resplendent Data Loaded")
  resplendentData = []
  print("Grouping Resplendent Data")
  for group in walkedData:
    for costume in group:
      resplendentData.append(costume['hero_id'])
  print("Saving data to server/data/heroes/resplendent_list.json")
  Utils.saveJSONDataToFile(resplendentData, 'heroes/resplendent_list.json')

# Seal
def handleSealData():
  print("Loading Seal Data")
  walkedData = Utils.getWalkData('files/assets/Common/SRPG/SkillAccessory')
  print("Seal Data Loaded")
  sealData = []
  print("Grouping Seal Data")
  for group in walkedData:
    for seal in group:
      sealData.append(seal['id_tag'])
  print("Saving data to server/data/skills/seal_list.json")
  Utils.saveJSONDataToFile(sealData, 'skills/seal_list.json')

# Locale
def handleLocaleData():
  LOCALES = ['EUDE', 'EUEN', 'EUES', 'EUFR', 'EUIT', 'JPJA', 'TWZH', 'USEN', 'USES', 'USPT']
  for locale in LOCALES:
    data = {}

    print("Loading Locale data: " + locale)
    walkedData = Utils.getWalkData('files/assets/'+locale, ['Character', 'CrossLanguage', 'Embedded', 'Menu', 'Scenario'])
    print("Finished Loading Locale data for " + locale)

    print("Setting key-value data")
    for fileData in walkedData:
      for point in fileData:
        data[point['key']] = point['value']

    print('Saving to file server/data/locales/locale_'+locale+'.json')
    Utils.saveJSONDataToFile(data, 'server/data/locales/locale_'+locale+'.json')

handleHeroData()
handleSkillData()
handleResplendentData()
handleSealData()
handleLocaleData()