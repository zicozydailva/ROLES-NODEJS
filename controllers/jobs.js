const Job = require("../models/Job")


const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.userId })
    res.status(200).json({ count: jobs.length, jobs })
  } catch (err) {
    res.status(500).json(err)
  }
}

const getJob = async (req, res) => {
  try {

    const {
      user: { userId },
      params: { id: jobId }
    } = req;

    const job = await Job.findOne({
      _id: jobId,
      createdBy: userId
    })
    if (!job) {
      res.status(404).json({ err: "Not Found ...!!" })
    }

    res.status(200).json({ job })


  } catch (err) {
    res.status(500).json(err)
  }

}
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const user = await Job.create(req.body);
  res.status(200).json({ success: user })
}

const updateJob = async (req, res) => {
  try {
    const {
      body: { company, position },
      user: { userId },
      params: { id: jobId }
    } = req;

    if (company === "" || position === "") {
      res.status(401).json({ errMsg: "company and position field cannot be empty" })
    }

    const job = await Job.findByIdAndUpdate({
      _id: jobId,
      createdBy: userId
    }, req.body, { new: true, runValidators: true })
    if (!job) {
      res.status(404).json({ errMsg: "Job doesn't exist: updates" })
    }

    res.status(200).json({ job })

  } catch (err) {
    res.status(500).json(err)
  }
}

const deleteJob = async (req, res) => {
  try {

    const {
      user: { userId },
      params: { id: jobId }
    } = req;

    const job = await Job.findByIdAndRemove({
      _id: jobId,
      createdBy: userId
    }, {new: true, runValidators: true})

    if(!job) {
      res.status(404).json({errMsg: "Job doesnt Exist"})
    }
    res.status(200).json({deleted:job})


  } catch(err) {
    res.status(500).json(err)
  }

}

module.exports = {
  getAllJobs, getJob, createJob, updateJob, deleteJob
}