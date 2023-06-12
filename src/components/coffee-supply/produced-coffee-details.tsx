import { useAppDispatch, useAppSelector } from "@/app/store";
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    CircularProgress,
    Divider,
    Grid,
    Stack,
    TextField
} from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { ProducedCoffeeResult } from "@/features/supply/supplySlice";
import ProducedCoffeeBags from "./produced-coffee-bags";
import { GradeProducedCoffee } from "@/api/supply";
import Router from 'next/router';

function ProducedCoffeeDetails() {
    const dispatch = useAppDispatch();
    const prodeucedCoffees = useAppSelector(state => state.supply.producedCoffee.result);
    const transportations = useAppSelector(state => state.transportation.tranportation.response);
    const growers = useAppSelector(state => state.grower.growers.result);
    const grading = useAppSelector(state => state.supply.grading);
    const [selectedProducedCoffee, setSelectedProducedCoffee] = useState<ProducedCoffeeResult>();
    const router = useRouter()
    const { batch_number } = router.query

    const [gradeValues, setGradeValues] = useState({
        owner: selectedProducedCoffee?.Record.owner || '',
        batchNumber: selectedProducedCoffee?.Record.batchNumber || '',
        grade: ''
    });
    const [values, setValues] = useState({
        bagSize: '',
        batchNumber: '',
        coffeeCherryBatchNo: '',
        coffeeType: '',
        currency: '',
        isShipped: false,
        measurmentUnit: '',
        owner: '',
        productionDate: '',
        productionPlace: '',
        shimpemntId: '',
        shipment: {
            destination: '',
            shipmentDate: '',
            transporter: '',
            truck: ''
        },
        status: '',
        traceability: {
            batchNumber: '',
            coffeegrower: '',
            deliveryDate: '',
            deliveryId: '',
            farmPlace: ''
        },
        txId: ''
    });

    const handleChange = (event: any) => {
        setGradeValues({
            ...gradeValues,
            [event.target.name]: event.target.value
        });
    };


    const handleGradeClick = async () => {
        await dispatch(GradeProducedCoffee(gradeValues));
        Router
        .push('/supply-coffee')
        .catch(console.error);
    }

    useEffect(() => {
        setSelectedProducedCoffee(prodeucedCoffees.find(g => g.Record.batchNumber === batch_number));
        setValues({
            bagSize: selectedProducedCoffee?.Record.bagSize || '',
            batchNumber: selectedProducedCoffee?.Record.batchNumber || '',
            coffeeCherryBatchNo: selectedProducedCoffee?.Record.coffeeCherryBatchNo || '',
            coffeeType: selectedProducedCoffee?.Record.coffeeType || '',
            currency: selectedProducedCoffee?.Record.currency || '',
            isShipped: selectedProducedCoffee?.Record.isShipped || false,
            measurmentUnit: selectedProducedCoffee?.Record.measurmentUnit || '',
            owner: selectedProducedCoffee?.Record.owner || '',
            productionDate: selectedProducedCoffee?.Record.productionDate || '',
            productionPlace: selectedProducedCoffee?.Record.productionPlace || '',
            shimpemntId: selectedProducedCoffee?.Record.shimpemntId || '',
            shipment: {
                destination: selectedProducedCoffee?.Record.shipment.destination || '',
                shipmentDate: selectedProducedCoffee?.Record.shipment.shipmentDate || '',
                transporter: transportations.find(t => t.Record.id === selectedProducedCoffee?.Record.shipment.transporter)?.Record.givenFor || '',
                truck: selectedProducedCoffee?.Record.shipment.truck || ''
            },
            status: selectedProducedCoffee?.Record.status || '',
            traceability: {
                batchNumber: selectedProducedCoffee?.Record.traceability.batchNumber || '',
                coffeegrower: growers.find(g => g.Record.id === selectedProducedCoffee?.Record.traceability.coffeegrower)?.Record.fullName || '',
                deliveryDate: selectedProducedCoffee?.Record.traceability.deliveryDate || '',
                deliveryId: selectedProducedCoffee?.Record.traceability.deliveryId || '',
                farmPlace: selectedProducedCoffee?.Record.traceability.farmPlace || ''
            },
            txId: selectedProducedCoffee?.Record.txId || ''
        })
    })
    return (
        <>

            <Grid
                container
                spacing={3}
            >
                <Grid
                    item
                    md={5}
                    xs={12}
                >
                    <Box>
                        <Card
                            sx={{
                                p: 2,
                                mb: 2
                            }}
                        >
                            <CardHeader
                                title="Grade"
                                subheader="only grade field is editable"
                            />
                            <Divider />
                            <CardContent>
                                <Grid
                                    container
                                    spacing={3}
                                >
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            fullWidth
                                            size='small'
                                            label="Owner"
                                            name="owner"
                                            value={gradeValues.owner}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            fullWidth
                                            size='small'
                                            label="Batch Number"
                                            name="batchNumber"
                                            value={gradeValues.batchNumber}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={12}
                                        xs={12}
                                    >
                                        <TextField
                                            fullWidth
                                            size='small'
                                            label="Grade"
                                            name="grade"
                                            onChange={handleChange}
                                            value={gradeValues.grade}
                                        />
                                    </Grid>
                                </Grid>
                                <Box
                                    sx={{
                                        mt: 2
                                    }}
                                >
                                    {grading ?
                                        <Stack
                                            sx={{
                                                alignItems: 'center',
                                                display: 'flex',
                                            }}
                                        >
                                            <CircularProgress
                                                color="primary"
                                            />
                                        </Stack>
                                        :
                                        <Button
                                            fullWidth
                                            color="primary"
                                            variant="contained"
                                            onClick={handleGradeClick}
                                        >
                                            Grade
                                        </Button>
                                    }
                                </Box>
                            </CardContent>
                        </Card>
                    </Box>
                    <Box>
                        <ProducedCoffeeBags />
                    </Box>
                    <Box >
                       
                    </Box>
                    
                </Grid>
                <Grid
                    item
                    md={7}
                    xs={12}
                >
                    <Card
                        sx={{
                            p: 2
                        }}
                    >
                        <CardHeader
                            subheader="This information cannot be edited"
                            title="Details"
                        />
                        <Divider />
                        <CardContent>
                            <Grid
                                container
                                spacing={3}
                            >
                                <Grid
                                    item
                                    md={4}
                                    xs={12}
                                >
                                    <TextField
                                        fullWidth
                                        size='small'
                                        label="Bag Size"
                                        name="bagSize"
                                        value={values.bagSize}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={4}
                                    xs={12}
                                >
                                    <TextField
                                        fullWidth
                                        size='small'
                                        label="Batch Number"
                                        name="batchNumber"
                                        value={values.batchNumber}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={4}
                                    xs={12}
                                >
                                    <TextField
                                        size='small'
                                        fullWidth
                                        label="Coffee Cherry Batch No."
                                        name="coffeeCherryBatchNo"
                                        value={values.coffeeCherryBatchNo}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={4}
                                    xs={12}
                                >
                                    <TextField
                                        size='small'
                                        fullWidth
                                        label="Currency"
                                        name="currency"
                                        value={values.currency}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={4}
                                    xs={12}
                                >
                                    <TextField
                                        size='small'
                                        fullWidth
                                        label="Coffee Type"
                                        name="coffeeType"
                                        value={values.coffeeType}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={4}
                                    xs={12}
                                >
                                    <TextField
                                        size='small'
                                        fullWidth
                                        label="Is Shipped"
                                        name="isShipped"
                                        value={values.isShipped ? "Yes" : "No"}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={4}
                                    xs={12}
                                >
                                    <TextField
                                        size='small'
                                        fullWidth
                                        label="Measurement Unit"
                                        name="measurmentUnit"
                                        value={values.measurmentUnit}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={4}
                                    xs={12}
                                >
                                    <TextField
                                        size='small'
                                        fullWidth
                                        label="Production Date"
                                        name="productionDate"
                                        value={values.productionDate}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={4}
                                    xs={12}
                                >
                                    <TextField
                                        size='small'
                                        fullWidth
                                        label="Production Place"
                                        name="productionPlace"
                                        value={values.productionPlace}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={4}
                                    xs={12}
                                >
                                    <TextField
                                        size='small'
                                        fullWidth
                                        label="Shimpemnt Id"
                                        name="shimpemntId"
                                        value={values.shimpemntId}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    md={4}
                                    xs={12}
                                >
                                    <TextField
                                        size='small'
                                        fullWidth
                                        label="Owner"
                                        name="owner"
                                        value={values.owner}
                                    />
                                </Grid>
                            </Grid>
                        </CardContent>
                        {/* <Divider /> */}

                        <Divider />
                        <Card
                            sx={{
                                p: 2
                            }}
                        >
                            <CardHeader
                                title="Shipment"
                            />
                            <Divider />
                            <CardContent>
                                <Grid
                                    container
                                    spacing={3}
                                >
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            fullWidth
                                            size='small'
                                            label="Destination"
                                            name="destination"
                                            value={values.shipment.destination}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            fullWidth
                                            size='small'
                                            label="Shipment Date"
                                            name="shipmentDate"
                                            value={values.shipment.shipmentDate}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            size='small'
                                            fullWidth
                                            label="Transporter"
                                            name="transporter"
                                            value={values.shipment.transporter}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={6}
                                        xs={12}
                                    >
                                        <TextField
                                            size='small'
                                            fullWidth
                                            label="Truck"
                                            name="truck"
                                            value={values.shipment.truck}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                        <Divider/>
                        <Card
                            sx={{
                                p: 2,
                                mt: 2
                            }}
                        >
                            <CardHeader
                                title="Traceability"
                            />
                            <Divider />
                            <CardContent>
                                <Grid
                                    container
                                    spacing={3}
                                >
                                    <Grid
                                        item
                                        md={4}
                                        xs={12}
                                    >
                                        <TextField
                                            fullWidth
                                            size='small'
                                            label="Batch Number"
                                            name="batchNumber"
                                            value={values.traceability.batchNumber}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={4}
                                        xs={12}
                                    >
                                        <TextField
                                            fullWidth
                                            size='small'
                                            label="Coffee Grower"
                                            name="coffeegrower"
                                            value={values.traceability.coffeegrower}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={4}
                                        xs={12}
                                    >
                                        <TextField
                                            size='small'
                                            fullWidth
                                            label="Delivery Date"
                                            name="deliveryDate"
                                            value={values.traceability.deliveryDate}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={4}
                                        xs={12}
                                    >
                                        <TextField
                                            size='small'
                                            fullWidth
                                            label="Delivery Id"
                                            name="deliveryId"
                                            value={values.traceability.deliveryId}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        md={4}
                                        xs={12}
                                    >
                                        <TextField
                                            size='small'
                                            fullWidth
                                            label="Farm Place"
                                            name="farmPlace"
                                            value={values.traceability.farmPlace}
                                        />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                    </Card >
                </Grid>
            </Grid>
        </>
    );
}


export default ProducedCoffeeDetails;