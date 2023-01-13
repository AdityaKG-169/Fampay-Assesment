type TServerResponse = {
	status: number;
	message: string;
	data: object | null;
	uniqueCode: string;
};

export default TServerResponse;
