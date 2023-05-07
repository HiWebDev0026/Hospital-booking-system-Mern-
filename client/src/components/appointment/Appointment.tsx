import styles from "./Appointment.module.css"
import { useState, useEffect } from "react";
import { Box, Button, FormControl, FormLabel, Heading, Input, Select, Stack, Textarea } from "@chakra-ui/react";
import { motion } from "framer-motion";

const Appointment = () => {
    const baseUrl = `https://jittery-shirt-tuna.cyclic.app`;
    const [fetchData, setFetchData] = useState([]);
    // const [time,setTime] = useState(0);
    // const [time,setTime] = useState(0);

    useEffect(() => {
        fetch(`${baseUrl}/doctors/all-doctors`)
            .then(res => { return res.json() })
            .then(data => {
                setFetchData(data.doctors);
            })
            .catch(err => { alert(err) })
    }, []);

    

    const bookSlot = ()=>{
        const date = document.getElementById("date") as HTMLInputElement;
        const doctor = document.getElementById("doctor") as HTMLInputElement;
        const time = document.getElementById("Time") as HTMLInputElement;
        // const phone = document.getElementById("phone") as HTMLInputElement;
        // const ambulance = document.getElementById("ambulance") as HTMLInputElement;
        // const message = document.getElementById("message") as HTMLInputElement;
        // patientName, doctorName, date, time, doctorId
        // const a = sessionStorage.getItem("Doctor");

        let dname = "";
        for(let i=0;i<fetchData.length;i++){
            if(fetchData[i]["id"] == doctor.value){
                dname = fetchData[i]["name"];
                break;
            }
        }

        
        
        const payload = {
            date: date.value,
            doctorName: dname,
            time: time.value,
            doctorId: doctor.value,
        }

        

        fetch(`${baseUrl}/appointments/book-appointment`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${sessionStorage.getItem("token")}`
                "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InB1bGtpdDEyM0BnbWFpbC5jb20iLCJpYXQiOjE2ODM0MTA0ODYsImV4cCI6MTY4MzQzNTY4Nn0.rzpZEeIrUhlTe42FS6T4qcsu_Lv0lov32MJET-KkijY`
            },
            body: JSON.stringify(payload),
        })
        .then(res => {return res.json()})
        .then(data => {
            alert(data.msg);
            console.log(data);
        }
        )
    }

   
   


    return (
        <Box as="form" p={6} bg="white" borderRadius="md" shadow="md" marginTop={"10vh"} textAlign={"center"}>
            <Heading as="h2" size="lg" mb={6}>
                Health Care Appointment
            </Heading>
            <Stack spacing={4} width={{ base: '1xl', sm: '2xl', md: 'xl' }} margin={"auto"} className={styles.formContainer}>
                <FormControl id="date" isRequired>
                    <FormLabel fontWeight="bold">Appointment Date</FormLabel>
                    <Input type="date" name="Appointment Date" bg="gray.50" border="none" borderRadius="md"/>
                </FormControl>
                
                <FormControl id="doctor" isRequired>
                    <FormLabel fontWeight="bold">Doctor's Name</FormLabel>
                    <Select placeholder="Select Doctor" bg="gray.50" border="none" borderRadius="md" id = "doctor">
                        {fetchData ?.map((el, i) => {
                            return (
                                <option key={i} value={el["id"]} >{el["name"]}</option>
                            )
                        })}
                    </Select>
                </FormControl>
                <FormControl id="Time" isRequired>
                    <FormLabel fontWeight="bold">Time</FormLabel>
                    <Select placeholder="Select Day" bg="gray.50" border="none" borderRadius="md">
                        <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                        <option value="11:30 AM - 12:30 PM">11:30 AM - 12:30 PM</option>
                        <option value="01:00 PM - 02:00 PM">01:00 PM - 02:00 PM</option>
                        <option value="02:30 PM - 03:30 PM">02:30 PM - 03:30 PM</option>
                        <option value="04:00 PM - 05:00 PM">04:00 PM - 05:00 PM</option>
                    </Select>
                </FormControl>
                <FormControl id="phone" isRequired>
                    <FormLabel fontWeight="bold">Phone</FormLabel>
                    <Input type="tel" name="phone" bg="gray.50" border="none" borderRadius="md" />
                </FormControl>
                <FormControl id="ambulance" isRequired>
                    <FormLabel fontWeight="bold">Need Ambulance?</FormLabel>
                    <Select placeholder="Need Ambulance?" bg="gray.50" border="none" borderRadius="md">
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                    </Select>
                </FormControl>
                <FormControl id="message">
                    <FormLabel fontWeight="bold">Message</FormLabel>
                    <Textarea name="message" bg="gray.50" border="none" borderRadius="md" />
                </FormControl>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button type="submit" colorScheme="teal" bg="teal.500" borderRadius="md" _hover={{ bg: "teal.600" }} onClick={(event)=>{
                        event.preventDefault();
                        bookSlot();
                    }}>
                        Book Now
                    </Button>
                </motion.div>
            </Stack>
        </Box>
    );
};

export default Appointment;
