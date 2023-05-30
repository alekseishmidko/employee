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

    const employee = await prisma.employee.create({
      data: { ...data, userId: req.user.id },
    });
    return res.status(201).json({ message: `${employee} is create` });
  } catch (error) {
    res.status(400).json({ message: "fault during add  employee // Add" });
  }
};
/**
 * @route POST api/employees/remove/:id
 * @desc удалить сотрудника
 * @access Private
 */
const remove = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "add a employee ID" });
    }
    const removedEmployee = await prisma.employee.delete({
      where: { id: id },
    });
    return res
      .status(201)
      .json({ message: `user with id ${id} has been deleted` });
  } catch (error) {
    res
      .status(400)
      .json({ message: "fault during remove  employee // remove" });
  }
};
/**
 * @route POST api/employees/edit/:id
 * @desc изменить данные сотрудника
 * @access Private
 */
const edit = async (req, res) => {
  try {
    const data = req.body;
    const id = data.id;
    if (
      !data.firstName ||
      !data.lastName ||
      !data.address ||
      !data.age ||
      !data.id
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const employee = await prisma.employee.update({
      where: {
        id,
      },
      data,
    });
    return res.status(201).json({ message: ` ${data.id} is edit` });
  } catch (error) {
    res.status(400).json({ message: "fault during edit  employee // edit" });
  }
};

/**
 * @route GET api/employees/:id
 * @desc получить данные сотрудника
 * @access Private
 */
const employee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await prisma.employee.findUnique({ where: { id: id } });
    console.log(employee);
    return res.status(201).json({ message: `user ${employee} arrived` });
  } catch (error) {
    res.status(400).json({ message: "fault duging get employee // Employee" });
  }
};
module.exports = { all, add, remove, remove, edit, employee };
