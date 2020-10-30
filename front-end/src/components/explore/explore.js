import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { initialState } from "../../reducks/store/initialState";
import { faqImportAction } from "../../reducks/exploreFAQ/action";
import { getFAQs } from "../../reducks/exploreFAQ/selectors";
import Header from '../header/header';
import Footer from '../footer/footer';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Explore = () => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const selector = useSelector((state) => state);
    const faqs = getFAQs(selector);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('http://localhost:3000/api/v1/faq')
            .then(response => response.json())
            .then((result) => {
                dispatch(faqImportAction(result));
            })
            .catch(() => null);
    }, []);

    return (
        <div>
            <Header />
            <div className="content">
                <h1>Explore</h1>
                <div>
                    {faqs.data.map((faq, index) => {
                        return (
                            <Accordion key={index} expanded={expanded === `panel${faq.faqId}`} onChange={handleChange(`panel${faq.faqId}`)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel${faq.faqId}bh-content`}
                                id={`panel${faq.faqId}bh-header`}
                            >
                                <Typography >{faq.question}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>{faq.answer}</Typography>
                            </AccordionDetails>
                        </Accordion>
                        );
                    })}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Explore;