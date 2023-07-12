

class ApiFeature {
    constructor(query, queryStr, company) {
        this.query = query,
            this.queryStr = queryStr,
            this.company = company
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            $or: [
                {
                    firstName: {
                        $regex: this.queryStr.keyword,
                        $options: "i"
                    }
                },
                {
                    middleName: {
                        $regex: this.queryStr.keyword,
                        $options: "i"
                    }
                },
                {
                    lastName: {
                        $regex: this.queryStr.keyword,
                        $options: "i"
                    }
                },
                {
                    department: {
                        $regex: this.queryStr.keyword,
                        $options: "i"
                    }
                },
            ]

        } : {
            company: this.company,
            status: undefined
        }

        this.query = this.query.find({ ...keyword, company: this.company, status: undefined })
        return this
    }
}




module.exports = ApiFeature