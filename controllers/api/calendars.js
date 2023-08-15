const Calendar = require('../../models/calendar')

module.exports = {
  create: createEntry,
  show: getCalendarEntriesForDay,
  index,
  delete: deleteCalendarEntry
}

async function createEntry(req, res) {
  try {
    const { user, date, time, activity } = req.body
    const calendar = await Calendar.findOneAndUpdate(
      { user },
      { $push: { entries: { date, time, activity } } },
      { new: true, upsert: true }
    )
    res.json(calendar)
    console.log('calendar item added successfully, -> ', calendar)
  } catch (error) {
    console.log(error)
    // Bad request
    res.status(400).json(error)
  }
}

async function getCalendarEntriesForDay(req, res) {
  try {
    const { user } = req
    const { date } = req.params
    const calendar = await Calendar.findOne({ user })
    const entries = calendar.entries.filter(entry => {
      // const entryDate = entry.date.toISOString().split('T')[0]
      const entryDate = entry.date.toISOString()
      return entryDate === date
    })
    // ? Sorting entries by time
    entries.sort((a, b) => a.time.localeCompare(b.time))
    res.json(entries)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

async function index(req, res) {
  try {
    const { user } = req
    const calendar = await Calendar.findOne({ user })
    const entries = calendar.entries.map(entry => entry.date.toISOString())
    // const entryDate = entry.date.toISOString().split('T')[0]
    res.json(entries)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}

async function deleteCalendarEntry(req, res) {
  try {
    const { id } = req.params
    const calendar = await Calendar.findOneAndUpdate(
      { 'entries._id': id },
      { $pull: { entries: { _id: id } } },
      { new: true }
    )

    if (!calendar) {
      return res.status(404).json({ message: 'Entry not found' })
    }
    res.json(calendar)
    console.log('Entry deleted successfully')
  } catch (error) {
    res.status(400).json(error)
  }
}