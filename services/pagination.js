export const getPaginatedData = async (Modal, page, limit, query, populate = "", select = "") => {
    page = +page || 1;
    limit = +limit || 10;
    try {
        const totalCounts = await Modal.find(query).countDocuments();
        if (!totalCounts) {
            return { data: [], currentPage: page, limit, totalCounts };
        }
        const data = await Modal
            .find(query)
            .skip((page - 1) * limit)
            .limit(limit)
            .populate(populate)
            .select(select)
        return { data, currentPage: page, limit, totalCounts }
    }
    catch (e) {
        return { data: false, message: e, displayMessage: `Something Went Wrong` };
    }
}