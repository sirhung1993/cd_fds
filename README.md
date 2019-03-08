# Fraud Detection System
## Objectives
- Detect suspicous, mistake or fraud transactions.
- Notify the suspicous transactions.
- API server for UI monitoring website.

## Overview

![FDS system](https://user-images.githubusercontent.com/8535911/54021716-5874f980-41c3-11e9-9789-deb37282e610.png)

### SSRS Datawarehouse(DW):
- Store data about smart sale recording systems.
- Have been updated periodically updated by ETL processes.

### FDS Scanner:
- Periodically scan SSRS DW and detect the suspicious transactions.
- Notify to maintainance team about newl suspicious transactions.

### FDS Tracking table:
- Tracking all suspicious transactions.

### API Server:
- Provide API to the client.

### FDS User interface:
- Display the information about suspicious transactions.
- Show detail information about transactions.

## Code conventions

```bash
fds_api
# all the global configurations declare
--config
# main calculation and rule base, use inheritance from the model
--control
# SQL create table for FDS tracking
--fds_sql
# Declare the parent Suspicion class for further inheritance, singleton object
--model
# API call processing
--router
# Some basic test for Test Driven Development processes
--test
# Declare FDS scanner forever loop
--utils
# entry file to fun FDS API SERVER
--main.js
# SOme basics environments variable, to deploy on production
--set_env.sh
```

## System Requirements
1. NodeJS > 8.0
2. Database connection should be correct
3. Environment variables including in config/config.js shoul be declared 
4. To run set_evn.sh - Linux environment is required.