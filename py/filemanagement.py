
def read_file(filename):
  directory = 'db/'
  with open(directory+filename) as f:
    content = f.readlines()
  
  newcontent = []
  sample = content[0].strip()
  
  if sample.isnumeric():
    for data in content:
      newcontent.append(int(data.strip()))
  else:
    for data in content:
      newcontent.append(data.strip())
  
  return newcontent
