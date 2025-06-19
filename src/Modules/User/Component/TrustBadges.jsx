import { Box, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import FastAndFree from '../Assets/JSON/FastAndFree.json';
import SecurePayment from '../Assets/JSON/SecurePayment.json'
import CustomerSupport from '../Assets/JSON/CustomerSupport.json'
import EasyReturn from '../Assets/JSON/EasyReturn.json'
import QualityAssurance from '../Assets/JSON/QualityAssurance.json'
import BestPrice from '../Assets/JSON/BestPrice.json'

export default function TrustBadges() {

    const badges = [
        { heading: "Secure Payments", text: "Your payment information is processed securely. We do not store credit card details", icon: SecurePayment }, //"https://cdn-icons-png.flaticon.com/512/5790/5790705.png"
        { heading: "Free & Fast Shipping", text: "Enjoy free delivery on orders above ₹499. Get your order in 2–5 business days.", icon: FastAndFree }, //"https://cdn-icons-png.flaticon.com/512/2563/2563912.png" 
        { heading: "Quality Assurance", text: "We guarantee the quality of our products. No fakes. No compromises.", icon: QualityAssurance },
        { heading: "Easy Returns", text: "Not satisfied? Return or exchange within 7 days—no questions asked!", icon: EasyReturn }, //"https://cdn-icons-png.flaticon.com/512/12463/12463307.png"
        { heading: "24/7 Support", text: "Need help? Our team is available 24/7 via chat, email, or call.", icon: CustomerSupport },
        { heading: "Best Price Guarantee", text: "We’ll match the price if you find it cheaper for the same product!", icon: BestPrice }
    ];

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', px: 2, py: 6, backgroundColor: '#fff' }}>
            <Typography variant="h3" ></Typography>
            <motion.h3 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ fontSize: '2.5rem', fontWeight: 800, paddingBottom: '10px' }} >
                Why you can trust us?
            </motion.h3>
            <Grid size={24} container spacing={2} sx={{ width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                {
                    badges.map((badge, i) => (
                        <Box key={i} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: 2, borderRadius: 2, boxShadow: 3, backgroundColor: 'rgb(245 245 245)', width: { xs: '100%', sm: '45%', md: '30%' } }}>
                            <Lottie animationData={badge.icon} loop style={{ height: 60, marginBottom: 8, }} />
                            <Typography variant="h5" sx={{ fontWeight: 600, marginTop: 1, }}> {badge.heading} </Typography>
                            <Typography variant="body1" sx={{ color: 'gray', marginTop: 0.5 }}>{badge.text}</Typography>
                        </Box>
                    ))
                }
            </Grid>
        </Box>
    )
}
