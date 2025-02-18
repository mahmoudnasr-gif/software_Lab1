const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  const { id } = req.params;
  const index = employee.findIndex(e => e.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'Employee not found' });
  }
  employee.splice(index, 1);
  res.status(200).json({ data: employee });
};

// TODO
exports.createEmployee = async (req, res, next) => {
  const { id,name } = req.body;
  if(!name || !id){
    res.status(400).json({ message: 'Name and id are required' });
  }
  employee.push({id,name});
  res.status(200).json({ data: employee });
};
