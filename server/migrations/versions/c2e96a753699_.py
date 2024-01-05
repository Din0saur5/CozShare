"""empty message

Revision ID: c2e96a753699
Revises: 14d72a732c98
Create Date: 2024-01-04 22:14:37.641448

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c2e96a753699'
down_revision = '14d72a732c98'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('events', schema=None) as batch_op:
        batch_op.add_column(sa.Column('event_time', sa.DateTime(), nullable=False))
        batch_op.drop_column('eventTime')

    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.drop_index('ix_posts_created')
        batch_op.create_index(batch_op.f('ix_posts_created'), ['created'], unique=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('posts', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_posts_created'))
        batch_op.create_index('ix_posts_created', ['created'], unique=False)

    with op.batch_alter_table('events', schema=None) as batch_op:
        batch_op.add_column(sa.Column('eventTime', sa.TEXT(), autoincrement=False, nullable=False))
        batch_op.drop_column('event_time')

    # ### end Alembic commands ###
