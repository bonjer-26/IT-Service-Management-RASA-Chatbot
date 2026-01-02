from typing import Any, Dict, List, Text
from rasa.core.channels.channel import OutputChannel, InputChannel
from sanic import Blueprint, response
from sanic.request import Request

class CustomRestInput(InputChannel):
    @classmethod
    def name(cls) -> Text:
        return "custom_rest"

    def blueprint(self, on_new_message):
        custom_webhook = Blueprint(
            "custom_rest_webhook", __name__
        )

        @custom_webhook.route("/webhook", methods=["POST"])
        async def receive(request: Request):
            sender_id = request.json.get("sender", "default")
            text = request.json.get("message")

            await on_new_message(
                self._create_user_message(text, sender_id)
            )
            return response.json([])

        return custom_webhook


class CustomRestOutput(OutputChannel):
    @classmethod
    def name(cls) -> Text:
        return "custom_rest"

    async def send_text_message(
        self,
        recipient_id: Text,
        text: Text,
        **kwargs: Any
    ):
        return {
            "recipient_id": recipient_id,
            "text": text,
            "metadata": kwargs.get("metadata", {})
        }
