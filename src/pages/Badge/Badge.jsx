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
import TextField from "@mui/material/TextField";
import LinearProgress from "@mui/material/LinearProgress";
import Pagination from "@mui/material/Pagination";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Data
import { badgeData } from "./data";

function Badge() {
  return (
    <Container disableGutters maxWidth={false}>
      {/* Hero Section */}
      <Container disableGutters maxWidth={false}>
        <Chip label="Gamification Hệ thống" variant="contained" />
        <Typography>
          Mỗi danh hiệu là một cột mốc trên hành trình học tập
        </Typography>
        <Typography>
          Khám phá hệ thống danh hiệu độc đáo của LearnFlow. Mỗi badge không chỉ
          là phần thưởng mà còn là sự ghi nhận nỗ lực bền bỉ, kỹ năng vượt trội
          và tinh thần cầu tiến của bạn.
        </Typography>
        <Button variant="contained">Khám phá nhiệm vụ</Button>
      </Container>
      {/* Overview Stats Section */}
      <Container disableGutters maxWidth={false}>
        <Grid container spacing={2}>
          <Grid size={4}>
            <Card>
              <CardContent>
                <Typography>Tổng danh hiệu</Typography>
                <Typography>64</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={4}>
            <Card>
              <CardContent>
                <Typography>Đã đạt được</Typography>
                <Typography>12</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={4}>
            <Card>
              <CardContent>
                <Stack direction="row">
                  <Typography>Tiến độ tổng quan</Typography>
                  <Typography>18.7%</Typography>
                </Stack>
                <LinearProgress variant="determinate" value={18.7} />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      {/* Search & Filter Section */}
      <Container disableGutters maxWidth={false}>
        <Stack direction="row" spacing={2}>
          <TextField placeholder="Tìm badge bạn muốn chinh phục..." />
          <Stack direction="row" spacing={1}>
            {badgeData.filterTabs.map((item, index) => (
              <Button
                key={index}
                variant={index === 0 ? "contained" : "outlined"}
              >
                {item}
              </Button>
            ))}
          </Stack>
        </Stack>
      </Container>

      {/* Badges Grid Section */}
      <Container disableGutters maxWidth={false}>
        <Grid container spacing={2}>
          {badgeData.badgeSection.map((obj, index) => (
            <Grid key={index} size={3}>
              <Card>
                <CardContent>
                  <Chip label={obj.badge} />
                  <Box>{obj.icon}</Box>
                  <Typography>{obj.title}</Typography>
                  <Typography>{obj.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant={
                      obj.status === "received" ? "contained" : "outlined"
                    }
                    disabled={obj.status === "locked"}
                  >
                    {obj.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Stack direction="row">
          <Pagination count={8} page={1} />
        </Stack>
      </Container>
      {/* Guide Section */}
      <Container disableGutters maxWidth={false}>
        <Typography>Làm thế nào để kiếm Badge?</Typography>
        <Grid container spacing={2}>
          {badgeData.guideSection.map((obj, index) => (
            <Grid key={index} size={4}>
              <Card>
                <CardContent>
                  <Box>{obj.icon}</Box>
                  <Typography>{obj.title}</Typography>
                  <Typography>{obj.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* FAQ Section */}
      <Container disableGutters maxWidth={false}>
        <Typography>Câu hỏi thường gặp</Typography>
        <Box>
          {badgeData.faqSection.map((obj, index) => (
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

export default Badge;
