import { GetAllDeliveryContract, InitiateDeliveryContract } from "@/api/delivery-contract";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
    Box,
    Button,
    CircularProgress,
    Grid,
    TextField
} from "@mui/material";
import { Modal, Space } from "antd";
import { useState } from "react";

function InitiateNewContract() {

        const dispatch = useAppDispatch();
        const adding = useAppSelector(state => state.deliveryContract.adding);
        const [open, setOpen] = useState(false);
        const [values, setValues] = useState({
            contractGoal: '',
            seller: 'OrgexporterMSP',
            buyer: '',
            sellerRight: '',
            sellerObligation: '',
            buyerRight: '',
            buyerObligation: '',
            BuyerRemark: '',
            cta: '',
            expectedQuantity: '',
            unit: '',
            deliveryAddress: '',
            pricePercentage: '',
            contractType: '',
            startDate: '',
            endDate: ''
        })

        const handleChange = (event: any) => {
            setValues({
                ...values,
                [event.target.name]: event.target.value
            })
        }

        const handleSubmit = async () => {
            await dispatch(InitiateDeliveryContract(values));
            dispatch(GetAllDeliveryContract());
            setValues({
                contractGoal: '',
                seller: '',
                buyer: '',
                sellerRight: '',
                sellerObligation: '',
                buyerRight: '',
                buyerObligation: '',
                BuyerRemark: '',
                cta: '',
                expectedQuantity: '',
                unit: '',
                deliveryAddress: '',
                pricePercentage: '',
                contractType: '',
                startDate: '',
                endDate: ''
            })
            setOpen(false);
        }
        return (
            <div>
                <Button
                    onClick={() => setOpen(true)}
                    variant="contained"
                    color="primary"
                >
                    Initiate Contract
                </Button>

                <Modal
                    title="Initiate a new Contract"
                    style={{ top: 70, left: 130 }}
                    open={open}
                    onCancel={() => setOpen(false)}
                    width={1000}
                    footer={[]}
                >
                    <form
                        autoComplete="on"
                    >
                        <Grid
                            container
                            columnSpacing={3}
                            p={2}
                        >
                            <Grid
                                item
                                lg={4}
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    size='medium'
                                    margin="normal"
                                    label="Contract Goal"
                                    name="contractGoal"
                                    required
                                    value={values.contractGoal}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid
                                item
                                lg={4}
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    size='medium'
                                    margin="normal"
                                    label="Seller"
                                    name="seller"
                                    required
                                    value={values.seller}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid
                                item
                                lg={4}
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    size='medium'
                                    fullWidth
                                    margin="normal"
                                    label="Buyer"
                                    name="buyer"
                                    required
                                    value={values.buyer}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid
                                item
                                lg={4}
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    size='medium'
                                    margin="normal"
                                    label="Seller Right"
                                    name="sellerRight"
                                    value={values.sellerRight}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid
                                item
                                lg={4}
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    size='medium'
                                    margin="normal"
                                    label="Seller Obligation"
                                    name="sellerObligation"
                                    required
                                    value={values.sellerObligation}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid
                                item
                                lg={4}
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    size='medium'
                                    margin="normal"
                                    label="Buyer Right"
                                    name="buyerRight"
                                    required
                                    value={values.buyerRight}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid
                                item
                                lg={4}
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    size='medium'
                                    margin="normal"
                                    label="Buyer Obligation"
                                    name="buyerObligation"
                                    required
                                    value={values.buyerObligation}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid
                                item
                                lg={4}
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    size='medium'
                                    margin="normal"
                                    label="Buyer Remark"
                                    name="BuyerRemark"
                                    required
                                    value={values.BuyerRemark}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid
                                item
                                lg={4}
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    size='medium'
                                    margin="normal"
                                    label="CTA"
                                    name="cta"
                                    required
                                    value={values.cta}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid
                                item
                                lg={4}
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    size='medium'
                                    margin="normal"
                                    label="Expected Quantity"
                                    name="expectedQuantity"
                                    required
                                    value={values.expectedQuantity}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid
                                item
                                lg={4}
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    size='medium'
                                    margin="normal"
                                    label="Unit"
                                    name="unit"
                                    required
                                    value={values.unit}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid
                                item
                                lg={4}
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    size='medium'
                                    margin="normal"
                                    label="Delivery Address"
                                    name="deliveryAddress"
                                    required
                                    value={values.deliveryAddress}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid
                                item
                                lg={4}
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    size='medium'
                                    margin="normal"
                                    label="Price Percentage"
                                    name="pricePercentage"
                                    required
                                    value={values.pricePercentage}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid
                                item
                                lg={4}
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    size='medium'
                                    margin="normal"
                                    label="Contract Type"
                                    name="contractType"
                                    required
                                    value={values.contractType}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid
                                item
                                lg={4}
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    size='medium'
                                    margin="normal"
                                    label="Start Date"
                                    name="startDate"
                                    required
                                    type="date"
                                    value={values.startDate}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid
                                item
                                lg={4}
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    size='medium'
                                    margin="normal"
                                    label="End Date"
                                    name="endDate"
                                    required
                                    type="date"
                                    value={values.endDate}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                paddingY: 3
                            }}
                        >
                            <Space>
                                <Button color='error' disabled={adding} onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                                {adding ?
                                    <CircularProgress
                                        size={15}
                                    />
                                    :
                                    <Button
                                        color="primary"
                                        disabled={
                                            adding ||
                                            values.contractGoal === "" ||
                                            values.seller === "" ||
                                            values.buyer === "" ||
                                            values.sellerRight === "" ||
                                            values.sellerObligation === "" ||
                                            values.buyerRight === "" ||
                                            values.buyerObligation === "" ||
                                            values.BuyerRemark === "" ||
                                            values.cta === "" ||
                                            values.expectedQuantity === "" ||
                                            values.unit === "" ||
                                            values.deliveryAddress === "" ||
                                            values.pricePercentage === "" ||
                                            values.contractType === "" ||
                                            values.startDate === "" ||
                                            values.endDate === ""
                                        }
                                        onClick={handleSubmit}
                                    >
                                        Initiate
                                    </Button>
                                }
                            </Space>

                        </Box>
                    </form >
                </Modal >
            </div >
        );
    }

export default InitiateNewContract;