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
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import Pagination from "@mui/material/Pagination";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Data
import { contestData } from "./data";

function Contest() {
  return (
    <Container disableGutters maxWidth={false}>
      {/* 1. Hero Section */}
      <Container disableGutters maxWidth={false}>
        <Chip label="Chinh phục thử thách mới" variant="contained" />
        <Typography>Đấu trường lập trình LearnFlow</Typography>
        <Typography>
          Nơi hội tụ những tài năng lập trình xuất sắc nhất. Thử thách bản thân
          qua các kỳ thi thuật toán đỉnh cao, bứt phá giới hạn kỹ năng và khẳng
          định vị thế trên bảng xếp hạng.
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button variant="contained">Tham gia ngay</Button>
          <Button variant="outlined">Xem luật chơi</Button>
        </Stack>
      </Container>

      {/* 2. Overview Stats Cards Section */}
      <Container disableGutters maxWidth={false}>
        <Grid container spacing={2}>
          {contestData.overviewStats.map((stat, index) => (
            <Grid key={index} size={4}>
              <Card>
                <CardContent>
                  <Typography>{stat.title}</Typography>
                  <Typography>{stat.value}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 3. Filter Tabs & Search Section */}
      <Container disableGutters maxWidth={false}>
        <Stack direction="row" spacing={2}>
          <TextField placeholder="Tìm contest bạn muốn tham gia..." />
          <Stack direction="row" spacing={1}>
            {contestData.filterTabs.map((tab, index) => (
              <Button
                key={index}
                variant={index === 0 ? "contained" : "outlined"}
              >
                {tab}
              </Button>
            ))}
          </Stack>
        </Stack>
      </Container>

      {/* 4. Contests Grid Section */}
      <Container disableGutters maxWidth={false}>
        <Grid container spacing={2}>
          {contestData.contestsGrid.map((contest, index) => (
            <Grid key={index} size={4}>
              <Card>
                <Chip label={contest.statusBadge} />
                <CardMedia
                  component="img"
                  height="140"
                  image={contest.imageUrl}
                  alt={contest.title}
                />
                <CardContent>
                  <Typography>{contest.title}</Typography>
                  <Typography>{contest.time}</Typography>
                  <Typography>{contest.duration}</Typography>
                  <Typography>{contest.participants}</Typography>
                </CardContent>
                <CardActions>
                  <Button variant={contest.actionVariant} fullWidth>
                    {contest.actionText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Pagination */}
        <Stack direction="row">
          <Pagination count={12} page={1} />
        </Stack>
      </Container>

      {/* 5. Why Join Section */}
      <Container disableGutters maxWidth={false}>
        <Typography>Tại sao nên tham gia Contest?</Typography>
        <Grid container spacing={2}>
          {contestData.whySection.map((item, index) => (
            <Grid key={index} size={3}>
              <Card>
                <CardContent>
                  <Box>{item.icon}</Box>
                  <Typography>{item.title}</Typography>
                  <Typography>{item.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 6. FAQ Section */}
      <Container disableGutters maxWidth={false}>
        <Typography>Những câu hỏi thường gặp</Typography>
        <Box>
          {contestData.faqSection.map((obj, index) => (
            <Accordion key={index} defaultExpanded={index === 0}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography component="span">{obj.title}</Typography>
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

export default Contest;
