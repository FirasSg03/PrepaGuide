# PrepaGuide
web app that helps Tunisian prepa students with their orientation

## Table of Contents
- [Description](#description)
- [Installation](#installation)
- [Features](#features)

## Description
An app to centralize and simplify the orientation process for Tunisian prepa students by offering clear, structured information about schools, branches, and access requirements.
Data is extracted from **official PDF documents** (results, reports, and orientation guides) provided by the Tunisian Ministry of Higher Education. These PDFs are processed and cleaned using custom scripts (see the [data-workflow](https://github.com/FirasSg03/data-workflow) repository).
- **Frontend**: HTML5-up compiled scss, css & vanilla js
- **Backend**: Flask.
- **Database**: SQLite via SQLAlchemy ORM

## Installation
```bash
git clone https://github.com/FirasSg03/PrepaGuide.git
cd PrepaGuide
pip install -r requirements.txt
python -m flask run
```

## Features
- **Search & Filter**: Find engineering schools by branch, specialty, or ranking.
- **Structured Data**: Clean, reliable data collected from official sources.
- **Orientation Aid**: Simplifies the decision-making process for students.
- **Responsive Design**: Works well on both desktop and mobile devices.
- **Fast & Lightweight**: Minimal UI focused on speed and clarity.




