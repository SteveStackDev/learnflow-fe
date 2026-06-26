// MUI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Data
import { pricingData } from "./data";

function Pricing() {
  return (
    <Container disableGutters maxWidth={false}>
      {/* Header & Toggle Section */}
      <Container disableGutters maxWidth={false}>
        <Typography>Chọn lộ trình phát triển phù hợp với bạn</Typography>
        <Typography>
          Từ những bước đầu tiên làm quen với mã nguồn đến việc trở thành chuyên
          gia lập trình với sự hỗ trợ của AI. LearnFlow đồng hành cùng mọi giai
          đoạn sự nghiệp của bạn.
        </Typography>
        <Stack direction="row" spacing={2}>
          <Typography>Thanh toán tháng</Typography>
          <Switch defaultChecked={false} />
          <Typography>Thanh toán năm</Typography>
          <Chip label="Giảm 20%" />
        </Stack>
      </Container>

      {/* Pricing Cards Section */}
      <Container disableGutters maxWidth={false}>
        <Grid container spacing={2}>
          {pricingData.pricingCards.map((obj, index) => (
            <Grid key={index} size={4}>
              <Card>
                {obj.isPopular && <Chip label="Phổ biến nhất" />}
                <CardContent>
                  <Typography>{obj.title}</Typography>
                  <Stack direction="row">
                    <Typography>{obj.price}</Typography>
                    <Typography>{obj.period}</Typography>
                  </Stack>
                  <Stack direction="column" spacing={1}>
                    {obj.features.map((item, index) => (
                      <Typography key={index}>✓ {item}</Typography>
                    ))}
                  </Stack>
                </CardContent>
                <CardActions>
                  <Button variant={obj.isPopular ? "contained" : "outlined"}>
                    {obj.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Detail Comparison Section */}
      <Container disableGutters maxWidth={false}>
        <Typography>So sánh chi tiết các gói</Typography>
        <Typography>
          Tìm hiểu kỹ hơn về sự khác biệt giữa các cấp độ thành viên.
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tính năng</TableCell>
                <TableCell>Free</TableCell>
                <TableCell>Plus</TableCell>
                <TableCell>Pro</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pricingData.comparisonRows.map((obj, index) => {
                if (obj.type === "section") {
                  return (
                    <TableRow key={index}>
                      <TableCell colSpan={4}>
                        <Typography>{obj.name}</Typography>
                      </TableCell>
                    </TableRow>
                  );
                }
                return (
                  <TableRow key={index}>
                    <TableCell>{obj.name}</TableCell>
                    <TableCell>{obj.free}</TableCell>
                    <TableCell>{obj.plus}</TableCell>
                    <TableCell>{obj.pro}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* FAQ Section */}
      <Container disableGutters maxWidth={false}>
        <Typography>Các câu hỏi thường gặp</Typography>
        <Typography>
          Mọi điều bạn cần biết về gói dịch vụ của LearnFlow.
        </Typography>
        <Box>
          {pricingData.faqSection.map((obj, index) => (
            <Accordion key={index} defaultExpanded={index === 0}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{obj.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{obj.description}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Container>
  );
}

export default Pricing;
