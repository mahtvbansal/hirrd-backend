const {ApplicationRepository} = require("../repositories")

const applicationRepository = new ApplicationRepository()

const getMyApplications = async (data) => {
    try {
        const response = await applicationRepository.getAll(data)
        return response;
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const getApplicationData = async (data) => {
    try {

    } catch (error) {
        console.log(error)
        throw error;
    }
}

const updateApplicationStatus = async (data, id) => {
    try {
        const response = await applicationRepository.update(data, {application_id: id})
        return response
    } catch (error) {
        console.log(error)
        throw error;
    }
}

const createNewApplication = async (data) => {
    try {
        const response = await applicationRepository.create(data)
        return response
    } catch (error) {
        console.log(error)
        throw error;
    }
}

module.exports = {
    getMyApplicationsService : getMyApplications,
    getApplicationDataService : getApplicationData,
    updateApplicationStatusService : updateApplicationStatus,
    createNewApplicationService : createNewApplication
}
