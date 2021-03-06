import { OrderDetailModel } from "../models/OrderDetailModel.js";

export const orderDetailController = {
    add: async (req, res)=>{
        try {
            const newOrderDetail = new OrderDetailModel(req.body);
            const saveOrderDetail = await newOrderDetail.save();
            res.status(200).json(saveOrderDetail);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getAll: async (req, res) =>{
        try {
            const orderDetails = await OrderDetailModel.find();
            res.status(200).json(orderDetails);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    update: async (req, res) =>{
        try {
            const orderDetail = await OrderDetailModel.findById(req.params.id);
            await orderDetail.updateOne({ $set: req.body});
            res.status(200).json("Update successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    delete: async (req, res) =>{
        try {
            await OrderDetailModel.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully!");
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getA: async (req, res) => {
        try {
            const orderDetail = await OrderDetailModel.findById(req.params.id);
            res.status(200).json(orderDetail);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    getByOrder: async (req, res) =>{
        const page = parseInt(req.body.page);
        const pageSize = parseInt(req.body.pageSize);
        const skipIndex = (page - 1) * pageSize;
        const result = {
            orderDetail:[],
            numberOfResult: '',
            offset: ''
        }
        try {
            result.orderDetail = await OrderDetailModel.find({order:req.params.id}).populate('product');
            result.numberOfResult = result.orderDetail.length;
            result.orderDetail = await OrderDetailModel.find({order:req.params.id}).populate('product')
            .limit(pageSize)
            .skip(skipIndex);
            result.offset = skipIndex;
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}