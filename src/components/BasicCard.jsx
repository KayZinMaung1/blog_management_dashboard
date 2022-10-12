import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';

const BasicCard = ({ qty, label }) => {
    return (
        <Paper elevation={2}>
            {/* <Card sx={{ minWidth: 275, minHeight: 175 }} > */}
            <Card>
                <CardContent sx={{ margin: '9%' }}>
                    <Typography variant="h3" component="div" align='center' sx={{color:'var(--secondary-color)'}}>
                        {qty}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary" align='center'>
                        {label}
                    </Typography>
                </CardContent>

            </Card>
        </Paper>

    );
}
export default BasicCard;
