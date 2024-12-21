
const Candidate = require("../models/candidateModel");

exports.uploadCandidates = async (req, res) => {
  try {
    const rows = req.body.rows;
    let processed = 0, skipped = 0;

    console.log('Rows:', rows);

    for (const row of rows) {
      const {
        "Name of the Candidate": name,
        Email: email,
        "Mobile No.": mobileNo,
        "Date of Birth": dateOfBirth,
        "Work Experience": workExperience,
        "Resume Title": resumeTitle,
        "Current Location": currentLocation,
        "Postal Address": postalAddress,
        "Current Employer": currentEmployer,
        "Current Designation": currentDesignation,
      } = row;

      try {
        const existing = await Candidate.findOne({ email });
        if (!existing) {
          await Candidate.create({
            name,
            email,
            mobileNo,
            dateOfBirth,
            workExperience,
            resumeTitle,
            currentLocation,
            postalAddress,
            currentEmployer,
            currentDesignation,
          });
          processed++;
        } else {
          skipped++;
        }
      } catch (err) {
        console.error(`Error processing row for ${email}:`, err); 
      }
    }

    res.status(200).json({
      success: true,
      processed,
      skipped,
    });

  } catch (err) {
    console.error("Error in uploadCandidates function:", err); 
    res.status(500).json({
      success: false,
      error: "Failed to upload candidates",
      details: err.message || err,
    });
  }
};

