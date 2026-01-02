from typing import Any, Text, Dict, List
from rasa_sdk import Action, Tracker, FormValidationAction
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.types import DomainDict
from rasa_sdk import Action, Tracker
from rasa_sdk.events import UserUtteranceReverted
from rasa_sdk.executor import CollectingDispatcher
import random


def shuffle_response_template(templates):
    return random.choice(templates)


class  ActionUtterHelpMessage(Action):

    def name(self) -> Text:
        return "action_utter_help_message"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:

        response = [
            domain["responses"]["utter_set_up_laptop"]
        ]
        response = shuffle_response_template(response)
        dispatcher.utter_message(
            text=response["text"],
            metadata=response.get("metadata", {})
        )
        return []

class ActionDefaultFallback(Action):
    """Executes the fallback action and goes back to the previous state
    of the dialogue"""

    def name(self) -> Text:
        return "action_default_fallback"

    async def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:
        
        response = domain["responses"]["utter_default"]
        response = shuffle_response_template(response)
        dispatcher.utter_message(text=response)
        # Revert user message which led to fallback.
        return [UserUtteranceReverted()]
    
class ActionZoomMeeting(Action):

    def name(self) -> Text:
        return "action_zoom_meeting"

    def run(
        self,
        dispatcher: CollectingDispatcher,
        tracker: Tracker,
        domain: Dict[Text, Any],
    ) -> List[Dict[Text, Any]]:

        judul_kegiatan = tracker.get_slot("judul_kegiatan")
        date = tracker.get_slot("date")
        place = tracker.get_slot("place")

        # Here you can:
        # - call Zoom API
        # - save to DB
        # - log ITSM request

        return []