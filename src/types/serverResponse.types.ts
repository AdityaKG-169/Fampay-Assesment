type TServerResponse = {
	type: 'success' | 'error';
	status: number;
	message: string;
	data: object | null;
	uniqueCode: string;
};

export default TServerResponse;
