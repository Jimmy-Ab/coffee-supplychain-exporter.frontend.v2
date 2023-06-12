import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/store";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Typography
} from '@mui/material';
import { useRouter } from 'next/router'
import { getInitials } from '@/utils/get-initials';
import { DeliveryContractResult } from "@/features/delivery-contract/deliveryContractSlice";
import { Tag } from "antd";
import dateFormat from "dateformat";


function DeliveryContractProfile() {
    const dispatch = useAppDispatch();
    const deliveryContracts = useAppSelector(state => state.deliveryContract.deliveryContract.response);
    const [selectedDeliveryContract, setSelectedDeliveryContract] = useState<DeliveryContractResult>();
    const router = useRouter();
    const { id } = router.query;
  
    useEffect(() => {
        setSelectedDeliveryContract(deliveryContracts.find(g => g.Record.id === id));
    }, [selectedDeliveryContract])
    return (
        <Card >
            <CardContent>
                <Box
                    sx={{
                        alignItems: 'center',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Avatar
                        sx={{
                            height: 64,
                            mb: 2,
                            width: 64
                        }}
                    >
                        {getInitials(selectedDeliveryContract?.Record.buyer)}
                    </Avatar>
                    <Typography
                        color="textPrimary"
                        gutterBottom
                        variant="h5"
                    >
                        {selectedDeliveryContract?.Record.buyer}
                    </Typography>
                    <Typography
                        color="textSecondary"
                        variant="h6"
                    >
                        Started {dateFormat(selectedDeliveryContract?.Record.startDate, "mmm d, yyyy")}
                    </Typography>
                    <Typography
                        color="textPrimary"
                        variant="body1"
                    >
                        {selectedDeliveryContract?.Record.BuyerRemark}
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            pt: 2
                        }}
                    >
                        <Tag
                            color={(selectedDeliveryContract?.Record.contractStatus === 'REQUESTED' && '#FFB020')
                                || (selectedDeliveryContract?.Record.contractStatus === 'APPROVED' && '#14B8A6')
                                || (selectedDeliveryContract?.Record.contractStatus === 'SIGNED' && 'success')
                                || '#D14343'}
                        >
                            {selectedDeliveryContract?.Record.contractStatus.toUpperCase()}
                        </Tag>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

export default DeliveryContractProfile;