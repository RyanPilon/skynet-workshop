import { useState, useEffect } from 'react';
import {
  Button,
  Form,
  Input,
  Header,
  Image,
  Loader,
  Dimmer,
  Segment,
  Divider,
  Label,
} from 'semantic-ui-react';
import { PopoverPicker } from './PopoverPicker';
import Links from './Links';
import FileDrop from './Filedrop';

// WorkshopForm is a simple form used for the Skynet Workshop
const WorkshopForm = (props) => {
  const [uploadPreview, setUploadPreview] = useState(props.fileSkylink);

  useEffect(() => {
    setUploadPreview(props.fileSkylink);
  }, [props.fileSkylink]);

  return (
    <>
      <Segment>
        <Dimmer active={props.loading}>
          <Loader active={props.loading} />
        </Dimmer>

        {props.activeTab > 1 && (
          <>
            {props.loggedIn === true && (
              <Button onClick={props.handleMySkyLogout}>
                Log Out of MySky
              </Button>
            )}
            {props.loggedIn === false && (
              <Button color="green" onClick={props.handleMySkyLogin}>
                Login with MySky
              </Button>
            )}
            {props.loggedIn === null && <Button>Loading MySky...</Button>}
            {props.activeTab === 2 && (
              <Label pointing="left" color="green" basic>
                Once logged into MySky, we can save and load data in "files".
              </Label>
            )}
            <Divider />
          </>
        )}

        <Form onSubmit={props.handleSubmit}>
          {props.activeTab > 1 && (
            <>
              <Header as="h4">MySky File Data</Header>

              <Form.Field>
                <label>
                  Discoverable UserID <i>(Shared across MySky)</i>
                </label>
                <Input
                  placeholder="You must Login with MySky..."
                  value={props.userID}
                  icon="user circle"
                  iconPosition="left"
                />
              </Form.Field>
              <Form.Group>
                <Form.Field>
                    {props.activeTab === 2 && (
                    <Label pointing basic color="green">
                      MySky Files are saved at a path. An app must have
                      permissions to write there.
                    </Label>
                  )}
                </Form.Field>
              </Form.Group>
            </>
          )}
          {/* Input for name */}
          {props.activeTab > 0 && (
            <>
              <Form.Group>
                <Form.Input
                  label="Please Put Your Name and a Picture, Then Click Send, to Begin Your Adventure With Skynet"
                  placeholder="Enter your Name HERE"
                  value={props.name}
                  onChange={(e) => {
                    props.setName(e.target.value);
                  }}
                />
              </Form.Group>
            </>
          )}
          {/* Input for file */}
          {/* <Header as="h4">Task List Upload</Header> */}
          <Form.Group inline>
            <Form.Field>
              <FileDrop
                setFile={props.setFile}
                setUploadPreview={setUploadPreview}
              />
            </Form.Field>
            
          </Form.Group>
          {props.activeTab === 0 && (
            <Label pointing basic color="green">
              After uploading to Skynet, an immutable Skylink is returned!
            </Label>
          )}
          <Divider />
          <Button primary disabled={!uploadPreview} type="submit">
            Send to Skynet
          </Button>
          {props.activeTab === 1 && (
            <Label pointing="left" basic color="green">
              Now we'll upload a directory with an index.html file. The Skylink
              will be a website.
            </Label>
          )}
        </Form>
      </Segment>
      <Links
        fileSkylink={props.fileSkylink}
        webPageSkylink={props.webPageSkylinkUrl}
      />
    </>
  );
};

export default WorkshopForm;
