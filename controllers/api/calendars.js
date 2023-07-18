const Calendar = require('../../models/calendar')

module.exports = {
  create: createEntry,
  show: getCalendarEntriesForDay
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
      const entryDate = entry.date.toISOString().split('T')[0]
      return entryDate === date
    })
    res.json(entries)
  } catch (error) {
    console.log(error)
    res.status(400).json(error)
  }
}