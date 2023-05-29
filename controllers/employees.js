const { prisma } = require("../prisma/prisma-client");
/**
 * @route GET api/employees
 * @desc все сотрудники
 * @access Private
 */
const all = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    res.status(200).json(employees);
  } catch (error) {
    res.status(400).json({ message: "fault duging get all employees // All" });
  }
};
/**
 * @route POST api/employees/add
 * @desc добавить сотрудника
 * @access Private
 */
const add = async (req, res) => {
  try {
    const data = req.body;
    if (!data.firstName || !data.lastName || !data.address || !data.age) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const employee = await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        createdEmployee: {
          create: data,
        },
      },
    });
    return res.status(201).json({ message: "employee is updated //add" });
  } catch (error) {
    res.status(400).json({ message: "fault duging add  employee // Add" });
  }
};

module.exports = { all, add };
