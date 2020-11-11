import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { initialState } from "../../reducks/store/initialState";
import { faqImportAction } from "../../reducks/exploreFAQ/action";
import { getFAQs } from "../../reducks/exploreFAQ/selectors";
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { API_URL } from '../global_variables';

const FAQExplore = () => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const selector = useSelector((state) => state);
    const faqs = getFAQs(selector);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`${API_URL}/faq`)
            .then(response => response.json())
            .then((result) => {
                dispatch(faqImportAction(result));
            })
            .catch(() => null);
    }, []);

    return (

        <div className="faq-section">
            <h2>Frequently Asked Questions on Recycling</h2>
            <h3>Below are answers to some of the most common questions about recycling!</h3>
            <div className="hr-separator"></div>
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

    );
}

export default FAQExplore;