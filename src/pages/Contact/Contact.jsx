// MUI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

// Data
import { contactData } from "./data";

function Contact() {
  return (
    <Container disableGutters maxWidth={false}>
      {/* Hero Section */}
      <Container disableGutters maxWidth={false}>
        <Chip label="Hỗ trợ 24/7" variant="contained" />
        <Typography>Liên hệ với LearnFlow</Typography>
        <Typography>
          Đội ngũ LearnFlow luôn sẵn sàng lắng nghe và hỗ trợ bạn trên mọi lộ
          trình học tập, giải đáp thắc mắc kỹ thuật hoặc thảo luận về các cơ hội
          hợp tác mới.
        </Typography>
      </Container>

      {/* Feature Section */}
      <Container disableGutters maxWidth={false}>
        <Typography>
          LearnFlow là gì? Hệ sinh thái học tập có định hướng
        </Typography>
        <Grid container spacing={2}>
          {contactData.featureSection.map((obj, index) => {
            return (
              <Grid key={index} size={3}>
                {obj.icon}
                <Typography>{obj.title}</Typography>
                <Typography>{obj.description}</Typography>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* Contact Form Section */}
      <Container disableGutters maxWidth={false}>
        <Grid container spacing={2}>
          <Grid size={6}>
            <Typography>Gửi tin nhắn cho chúng tôi</Typography>

            <Box component="form">
              <Grid container spacing={2}>
                <Grid size={6}>
                  <TextField
                    label="Họ và tên"
                    variant="outlined"
                    placeholder="Nguyễn Văn A"
                    fullWidth
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    placeholder="example@email.com"
                    fullWidth
                  />
                </Grid>

                <Grid size={6}>
                  <TextField
                    label="Chủ đề"
                    variant="outlined"
                    placeholder="Vấn đề cần hỗ trợ"
                    fullWidth
                  />
                </Grid>
                <Grid size={6}>
                  <TextField
                    select
                    label="Loại yêu cầu"
                    defaultValue="tech"
                    variant="outlined"
                    fullWidth
                  >
                    <MenuItem value="tech">Hỗ trợ kỹ thuật</MenuItem>
                    <MenuItem value="billing">Hóa đơn & Thanh toán</MenuItem>
                    <MenuItem value="course">Tư vấn lộ trình học</MenuItem>
                  </TextField>
                </Grid>

                <Grid size={12}>
                  <TextField
                    label="Tin nhắn của bạn"
                    variant="outlined"
                    placeholder="Hãy cho chúng tôi biết chi tiết vấn đề của bạn..."
                    multiline
                    rows={4}
                    fullWidth
                  />
                </Grid>

                <Grid>
                  <Button variant="contained">Gửi yêu cầu ngay</Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid size={6}>
            <Typography>Thông tin hỗ trợ</Typography>

            <Stack direction="column" spacing={2}>
              {contactData.supportedData.map((obj, index) => {
                return (
                  <Stack key={index} direction="row" spacing={2}>
                    {obj.icon}
                    <Stack direction="column" spacing={2}>
                      <Typography>{obj.title}</Typography>

                      {typeof obj.description === "string" ? (
                        <Typography>{obj.description}</Typography>
                      ) : (
                        <Stack direction="row" spacing={2}>
                          {obj.description.map((item, index) => (
                            <Typography key={index}>{item}</Typography>
                          ))}
                        </Stack>
                      )}
                    </Stack>
                  </Stack>
                );
              })}

              <Box>
                <Typography>Văn phòng tại Quận 1, TP. Hồ Chí Minh</Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* More Contacts Section */}
      <Container disableGutters maxWidth={false}>
        <Typography>Kênh hỗ trợ chuyên biệt</Typography>
        <Grid container spacing={2}>
          {contactData.moreContactsData.map((obj, index) => {
            return (
              <Grid key={index} size={4}>
                {obj.icon}
                <Typography>{obj.title}</Typography>
                <Typography>{obj.description}</Typography>
                <Typography>{obj.contact}</Typography>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* FAQ Section */}
      <Container disableGutters maxWidth={false}>
        <Box>
          {contactData.faqSection.map((obj, index) => {
            return (
              <Accordion key={index} defaultExpanded={index === 0}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`${index + 1}-panel${index + 1}-content`}
                  id={`${index + 1}-panel${index + 1}-header`}
                >
                  <Typography component="span">{obj.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{obj.description}</Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      </Container>
    </Container>
  );
}

export default Contact;
